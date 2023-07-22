import React from 'react'
import "./header.css";
import { Link } from "react-router-dom"

function Header() {
  return (
    <>
        <header className='header'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/coins">Coins</Link></li>
                <li><Link to="/exchange">Exchange</Link></li>
            </ul>
        </header>
    </>
  )
}

export default Header
