import {useContext} from 'react'
import { Helmet } from 'react-helmet-async';
import Store from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import MessageBox from '../Component/MessageBox';
import { Link } from 'react-router-dom';
const CartScreen = () => {

 const {state,dispatch:ctxDispatch} = useContext(Store);

const { cart : {cartItems},} = state;

  return (
    <>
      <Helmet>
            <title> Shopping Cart</title>
      </Helmet>
     <h1>Shopping Cart</h1> 

     <Row>
     <Col md={8}>
      {
            cartItems.length === 0 ? (
             <MessageBox>
                  Cart Is Empty 
                  <Link to="/">Lets Shop</Link>
             </MessageBox>
            ):
            (
                  <ListGroup>
                        {
                              cartItems.map((item) =>(
                                    <ListGroup.Item key={item._id}>
                                          <Row ClassName="align-items-center">
                                                <Col md={4}>
                                                    <img
                                                      src={item.image}
                                                      alt={item.name}
                                                      ClassName="img-fluid rounded img-thumbnail"
                                                    />
                                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                </Col>
                                          </Row>
                                    </ListGroup.Item>
                              ))
                        }
                  </ListGroup>
            )
      }
     </Col>
     <Col md={4}></Col>
     </Row>
     
    </>
  )
}

export default CartScreen