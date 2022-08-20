import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
// import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../Component/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../Component/LoadingBox';
import { getError } from '../utilis';
import MessageBox from '../Component/MessageBox';
import { Store } from '../Store';

//REDUCER FUNCTION FOR STATE MANAGEMENT
const reducer = (state,action) => {
  switch (action.type){
    case 'FETCH_REQUEST':
      return {...state,loading: true};
    case 'FETCH_SUCCESS':
      return {...state,product:action.payload,loading: false};
    case 'FETCH_FAIL':
      return {...state,error: action.payload};
    default: 
      return state;
  }
}

const Productpage = () => {
  const navigate = useNavigate();
      const params = useParams();
      const {slug} = params;

      const [{loading,error,product},dispatch] = useReducer((reducer),{
        loading: true,
        error:'',
        product:[],
      });

       //FETCHING PRODUCT DATA FROM THE API
  useEffect(() =>{
    const fetchData = async() =>{
      dispatch({type:'FETCH_REQUEST'});
      try{
        const result = await axios.get(`/api/products/slug/${slug}`);
        // console.log(result);
        dispatch({type:'FETCH_SUCCESS',payload:result.data})
      }catch(e){
        dispatch({type:'FETCH_FAIL',payload:getError(e)});
      }

      // setProducts(result.data.products);
      // console.log(product);
  };
   fetchData();
  },[slug]);

  //add item to the cart
  const {state,dispatch:ctxDispatch} = useContext(Store);
  const {cart}=state;

  const addToCartHandler=async()=>{
  const existItem = cart.cartItems.find((x)=> x._id === product._id);
  const quantity = existItem ? existItem.quantity+1 : 1;
  const {data} = await axios.get(`/api/products/${product._id}`);
  if(data.countInStock < quantity){
    window.alert('This Product is Currently Out of Stock');
    return;
  }
   ctxDispatch({
    type:'CART_ADD_ITEM',
   payload:{...product,quantity:quantity},
   });
   

   //after adding item to cart they are navigating to the cart page
   navigate('/cart');


  }


  return  loading ? (<div><LoadingBox/></div>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) :(
      <div>
        <Row>
        <Col md={6}>
        <img 
            src = {product.image}
            alt={product.name}
            className="img-large"
          />
         {console.log(product.image)}
        </Col>

        {/* //PRODUCT INFO */}
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
            <Rating rating={product.rating} numsReview={product.numsReview}></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
            Price: <strong>${product.price}</strong> 
            </ListGroup.Item>
            <ListGroup.Item>
            <p>
              {product.description}
            </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

       {/* //PRODUCT STATUS */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">

                <ListGroup.Item>
                  <Row>
                  <Col>Price :</Col>
                  <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                  <Col>Status :</Col>
                  <Col>{product.countInStock>0? (
                    <Badge bg="success">Available</Badge>
                  ) : (
                    <Badge bg="danger">Out of stock</Badge>
                  )
                  }</Col>
                  </Row>
                </ListGroup.Item>
           {
            product.countInStock > 0 && (
              <ListGroup.Item>
                <div className="d-grid">
                  <Button onClick={addToCartHandler}>
                     Add To Cart
                  </Button>
                </div>
              </ListGroup.Item>
            )
           }
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        </Row>
      </div>
    )
   
    
}

export default Productpage;