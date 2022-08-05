import express from 'express';
const app = express();
//this is dummy data that we have created eralyer during the frontend designing
import data from './data.js';

app.get('/api/products', (req, res) => {
   res.send(data);
})


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
      console.log(`listening to port no ${PORT}.............`);
});