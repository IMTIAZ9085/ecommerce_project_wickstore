import React from 'react'

const Rating = (props) => {
const {rating,numsReview} = props
  return (
    <div className="rating">
        <span>
           Product Rating: <strong style={{color: 'red'}}>{rating}</strong><i style={{color: 'gold'}} className="fas fa-star"></i> <br/>
           <strong style={{color: 'red'}}>{numsReview}</strong> Reviews
        </span>
    </div>
  )
}

export default Rating;