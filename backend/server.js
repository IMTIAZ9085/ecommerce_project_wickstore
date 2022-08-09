import express from 'express';
const app = express();
//this is dummy data that we have created eralyer during the frontend designing
import data from './data.js';

app.get('/api/products', (req, res) => {
   res.send(data);
})

app.get('/api/products/slug/:slug', (req, res) => {
      const product = data.products.find((x)=>x.slug===req.params.slug);
      if(product){
            res.send(product);
      }else{
            res.status(404).send({message: 'Product is not available'});
      }
   })

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
      console.log(`listening to port no ${PORT}.............`);
});