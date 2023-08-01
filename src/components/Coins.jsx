import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {server} from '../index.js'
import Loader from './Loader.jsx';
import './exchange.css';
import CoinsCard from './CoinsCard.jsx';

export default function Coins() {

    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [page,setPage] = useState(1);
    const [currency,setCurrency] = useState("inr");

    const CurrencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const changePage = (page)=>{
      setPage(page);
      setLoading(true);
    }

    const btns = new Array(99).fill(1);

    useEffect(()=>{
        const fetchCoins = async () => {
            try {
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`) ;
            
                setCoins(data);
                setLoading(false);
                
            } catch (error) {
                setError(true);
                setLoading(false);

            }
        };

        fetchCoins();
    },[currency, page])

    if(error) {
        return <h1>Error While Fetching Api</h1>
    }

  return (
    <div style={{marginBottom:"65px"}}>
    { loading ? <Loader /> : <> {
      <>
      <div className='radio' >
          <input type="radio" id="inr" name={currency} value={"inr"} onChange={e=>setCurrency(e.target.value)} ></input>
          <label htmlFor="inr" >INR </label>
          <input type="radio" id="usd" name={currency}  value={"usd"} onChange={e=>setCurrency(e.target.value)}></input>
          <label htmlFor="usd">USD </label>
          <input type="radio" id="eur" name={currency}  value={"eur"} onChange={e=>setCurrency(e.target.value)}></input>
          <label htmlFor="eur">EUR </label>

      </div>
      
      <div>
        {coins.map((item) => (
            <CoinsCard id={item.id} name={item.name} price={item.current_price} 
            img={item.image} rank={item.market_cap_rank} symbol={item.symbol} key={item.id}
            CurrencySymbol={CurrencySymbol} />
        ))}
      </div>
      
        
         <div className="clearfix">
         { btns.map((item,index) => (
            <button className='btn'  key={index} onClick={()=>changePage(index + 1) } > {index + 1}</button>
         ))}
         </div>
         
       
      </>}
    </>

    }
    </div>


);

}