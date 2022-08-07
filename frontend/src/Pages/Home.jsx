import React, { useState ,useEffect, useReducer} from 'react'
import { Link } from 'react-router-dom';
// import data from '../data';
import axios from 'axios';

//REDUCER FUNCTION FOR STATE MANAGEMENT
const reducer = (state,action) => {
  switch (action.type){
    case 'FETCH_REQUEST':
      return {...state,loading: true};
    case 'FETCH_SUCCESS':
      return {...state,products:action.payload,loading: true};
    case 'FETCH_FAIL':
      return {...state,error: action.payload};
    default: 
      return state;
  }
}

const Home = () => {

  // const [productslist, setProducts] = useState([]);

  const [{loading,error,products},dispatch] = useReducer(reducer,{
    loading: true,
    error:'',
    products:[],
  });
 
  useEffect(() =>{
    const fetchData = async() =>{
      dispatch({type:'FETCH_REQUEST'});
      try{
        const result = await axios.get('/api/products');
        dispatch({type:'FETCH_SUCCESS',payload:result.data.products})
      }catch(e){
        dispatch({type:'FETCH_FAIL',payload:e.message});
      }

      // setProducts(result.data.products);
      // console.log(result);
      // console.log(products);
  };
   fetchData();
  },[]);


  return (
    <div>
    
    <h1>Features Products</h1>
      <div className="products_list">
        {/* <p style={{color: 'green'}}>{productslist.products[0].name}</p> */}
       {
        products.map((product)=>
           (
            
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
       )
       }
       </div>
    </div>
  )
}

export default Home;