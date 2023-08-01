import React from 'react'
import home from './home.jpg'
import './home.css'

function Home() {
  return (
    <div style={{backgroundColor:"black"}}>
    <img src={home} alt="asd" className='image'/>
      <h3>Crypto App By Ak</h3>
    </div>
  )
}

export default Home
