import React, {useEffect, useReducer} from 'react'
// import { Link } from 'react-router-dom';
// import data from '../data';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Component/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';
import { getError } from '../utilis';

//REDUCER FUNCTION FOR STATE MANAGEMENT
const reducer = (state,action) => {
  switch (action.type){
    case 'FETCH_REQUEST':
      return {...state,loading: true};
    case 'FETCH_SUCCESS':
      return {...state,products:action.payload,loading: false};
    case 'FETCH_FAIL':
      return {...state,error: action.payload};
    default: 
      return state;
  }
}

const Home = () => {

  // const [productslist, setProducts] = useState([]);

  const [{loading,error,products},dispatch] = useReducer(logger(reducer),{
    loading: true,
    error:'',
    products:[],
  });
  
  //FETCHING PRODUCT DATA FROM THE API
  useEffect(() =>{
    const fetchData = async() =>{
      dispatch({type:'FETCH_REQUEST'});
      try{
        const result = await axios.get('/api/products');
        dispatch({type:'FETCH_SUCCESS',payload:result.data.products})
      }catch(e){
        dispatch({type:'FETCH_FAIL',payload:getError(e)});
      }

      // setProducts(result.data.products);
      // console.log(result);
      // console.log(products);
  };
   fetchData();
  },[]);


  return (
    <div>
    <Helmet>
      <title>Wick Store</title>
    </Helmet>
    <h1>Features Products</h1>
      <div className="products_list">
       {   
         loading ? (<div><LoadingBox/></div>) : error ? (<MessageBox variant="danger">{error}</MessageBox>)  :
       (
        <Row>
        {products.map((product)=>
           (
            <Col sm={6} md={4} lg={3} key={product.slug} className="mb-3">
           <Product product={product}></Product>
          </Col>
      )    
       )}
       </Row>
       )
       }
       </div>
    </div>
  )
}

export default Home;