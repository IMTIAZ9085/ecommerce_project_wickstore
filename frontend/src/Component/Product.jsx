import React from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';

const Product = (props) => {
      const { product} = props;
  return (

      <Card className="each_product" >
      
      <Link to={`/product/${product.slug}`}>
       <img style={{height:"14rem",width:"14rem"}} className="card-img-top" src={product.image} alt={product.name} />
       </Link>
      
      <Card.Body>
      <Link style={{textDecoration:"none"}} to={`/product/${product.slug}`}> 
       <Card.Title>{product.name}</Card.Title>
       </Link>
       <Rating rating={product.rating} numsReview={product.numsReview}/>
       <Card.Text>${product.price}</Card.Text>
       <Button style={{backgroundColor:"red", border:"none"}}>ADD TO CART</Button>
      </Card.Body>

     </Card>

  )
}

export default Product;
