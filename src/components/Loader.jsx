import React from 'react'
import loading from "./loading.gif"
import './exchange.css'
function Loader() {
  return (
    <div className='loader'>
      <img className="imageLoader" src={loading} alt="loading" />
    </div>
  )
}

export default Loader
