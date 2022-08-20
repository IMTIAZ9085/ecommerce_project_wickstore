import {useContext} from 'react'
import { Helmet } from 'react-helmet-async';
import {Store} from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
                  <Link to="/">{'  '}Lets Shop</Link>
             </MessageBox>
            ):
            (
                  <ListGroup>
                        {
                              cartItems.map((item) =>(
                                    <ListGroup.Item key={item._id}>
                                          <Row className="align-items-center">

                                                <Col md={4}>
                                                    <img
                                                      src={item.image}
                                                      alt={item.name}
                                                      className="img-fluid rounded img-thumbnail cart-img"
                                                    /> {''} <br/>
                                                    <Link style={{textDecoration:"none"}} to={`/product/${item.slug}`}>{item.name}</Link>
                                                </Col>

                                             <Col md={3}>
                                                <Button varient="light" disabled={item.quantity===1}>
                                                      <i className="fas fa-minus-circle"></i>
                                                </Button>{' '}
                                                <span>{item.quantity}</span>
                                                <Button varient="light" disabled={item.quantity===item.countInStock}>
                                                      <i className="fas fa-plus-circle"></i>
                                                </Button>
                                             </Col>

                                             <Col md={3}>${item.price}</Col>

                                             <Col md={2}>
                                                <Button variant="light">
                                                   <i className="fas fa-trash"></i>
                                                </Button>
                                             </Col>

                                          </Row>
                                    </ListGroup.Item>
                              ))
                        }
                  </ListGroup>
            )
      }
     </Col>
     <Col md={4}>
      <Card>
            <Card.Body>
                  <ListGroup variant="flush">
                     <ListGroup.Item>
                        <h4 style={{fontWeight: 'bold', fontSize:"1.3rem"}}>
                              Total Item :{' '}{cartItems.reduce((a,c)=>a+c.quantity,0)}
                                <br/><br/>
                              Total Price : 
                              ${cartItems.reduce((a,c)=>a+c.quantity*c.price,0)}
                              
                        </h4>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Button type="button"
                         varient="primary"
                         disabled={cartItems.length === 0}
                        >
                              Purchase
                        </Button>
                     </ListGroup.Item>
                  </ListGroup>
            </Card.Body>
      </Card>
     </Col>
     </Row>
     
    </>
  )
}

export default CartScreen