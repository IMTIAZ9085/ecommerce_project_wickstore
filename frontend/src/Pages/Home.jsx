import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';
// import data from '../data';
import axios from 'axios';

const Home = () => {

  const [products, setProducts] = useState([]);
 
  useEffect(() =>{
    const fetchData = async() =>{
      const result = await axios.get('/api/products');
      // const dt =result.data ;
      setProducts(result.data);
      // console.log(result.data);
      // console.log(products);
  };
   fetchData();
  },[]);

  console.log(products);

  return (
    <div>
    
    <h1>Features Products</h1>
      <div className="products_list">
       {products.map((product)=>{
          return (
            <div className="each_product" key={product.slug}>

           <Link to={`/product/${product.slug}`}>
            <img style={{height:"14rem",width:"14rem"}} src={product.image} alt={product.name} />
            </Link>

            <div className="product_info">
            <Link to={`/product/${product.slug}`}>
            <p>{product.name}</p>
            </Link>

            <p><strong>${product.price}</strong></p>
            <button>ADD TO CART</button>
            </div>
          </div>
      )    
       })
       }
       </div>
    </div>
  )
}

export default Home;