import './App.css';
import data from './data';

function App() {
  return (
     <div>
      <header>
        <a href="/">WICK STORE</a>
      </header>
      <main>
       <h1>Features Products</h1>
       {/* //RENDERING THE PRODUCT data */}
       <div className="products">
       {
        data.products.map(product=>(
          <div className="each_product" key={product.slug}>

           <a href={`/product/${product.slug}`}>
            <img style={{height:"14rem",width:"14rem"}} src={product.image} alt={product.name} />
            </a>

            <div className="product_info">
            <a href={`/product/${product.slug}`}>
            <p>{product.name}</p>
            </a>

            <p><strong>${product.price}</strong></p>
            <button>ADD TO CART</button>
            </div>
          </div>
        ))
       }
       </div>
      </main>
     </div>
   
  );
}

export default App;
