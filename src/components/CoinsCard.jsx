import React from 'react'
import { Link } from 'react-router-dom'

function CoinsCard({id,name,img,symbol,price,CurrencySymbol="₹"}) {
  return ( 
    <Link to={`/coin/${id}`}  className='container'>
        <div className='card'>
            <img src={img} style={{objectFit:"contain"}} alt="exchange"></img>
            <h1 className="heading">{name}</h1> 
            <h2 className="">{symbol}</h2>
            <h2 >{price ? `${CurrencySymbol} ${price}` : "NA"}</h2>
        </div>

    </Link>
  )
}

export default CoinsCard
