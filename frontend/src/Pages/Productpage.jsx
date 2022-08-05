import React from 'react'
import { useParams } from 'react-router-dom';

const Productpage = () => {
      const params = useParams();
      const {slug} = params;
  return (
    <div>
    Productpage
    <h2>{slug}</h2>
    </div>
    
  )
}

export default Productpage;