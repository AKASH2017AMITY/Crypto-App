import React from 'react'
import home from './home.jpg'
import './home.css'

function Home() {
  return (
    <div>
      <img className="homeImage" src={home} />
      <h3>Crypto App By Ak</h3>
    </div>
  )
}

export default Home
