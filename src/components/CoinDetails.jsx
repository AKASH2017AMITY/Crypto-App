import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import {server} from '../index'
import { color } from 'framer-motion';
import { Box, background } from '@chakra-ui/react';
import Chart from './Chart';



function CoinDetails() {
  const param = useParams();
  const [coin,setCoin] = useState({});
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [currency,setCurrency] = useState("inr");
  const [days,setDays] = useState("24h");
  const [chartArray,setChartArray] = useState([]);


  const CurrencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  

  const btns =["24h","7d","14d","30d","60d","200d","365d","max"];

  const switchChartStats = (key)=> {
      switch (key) {
        case "24h":
          setDays("24h"); 
          // setLoading(true);
          break;
        case "7d":
          setDays("7d"); 
          // setLoading(true);
          break;
        case "14d":
          setDays("14d"); 
          // setLoading(true);
          break;
        case "30d":
          setDays("30d"); 
          // setLoading(true);
          break;
        case "60d":
          setDays("60d"); 
          // setLoading(true);
          break;
        case "200d":
          setDays("200d"); 
          // setLoading(true);
          break;
        case "365d":
          setDays("365d"); 
          // setLoading(true);
          break;
        case "max":
          setDays("max"); 
          // setLoading(true);
          break;      
        default:
          setDays("24h");
          // setLoading(true);
          break;
      }
  }

  useEffect(()=>{
    const fetchCoin = async () => {
        try {
            const {data} = await axios.get(`${server}/coins/${param.id}`) ;
            const {data:chartData} = await axios.get(`${server}/coins/${param.id}/market_chart?vs_currency=${currency}&days=${days}`) ;
            
            setCoin(data);
            setChartArray(chartData.prices);
            setLoading(false);
            
        } catch (error) {
            setError(true);
            setLoading(false);
  
        }
    };
  
    fetchCoin();
  },[param.id, currency, days])

  if(error) {
    return <h1>Error While Fetching Api</h1>
  }

  return (
    <div>
      {
      loading ? <Loader /> : <>
      {

        <>

        <Box width={"70%"} height={"70%"} borderWidth={"1"} margin-left={"50px"}>
          <Chart arr={chartArray} currency={CurrencySymbol} days={days}/>
        </Box>

        <div className="">
          {
            btns.map((i)=>(
              <button className="arrButton" key={i} onClick={()=>switchChartStats(i)}>{i}</button>
            ))
          }
        </div>
        <div className='radio' >
            <input type="radio" id="inr" name={currency} value={"inr"} onChange={e=>setCurrency(e.target.value)} ></input>
            <label htmlFor="inr" >INR </label>
            <input type="radio" id="usd" name={currency}  value={"usd"} onChange={e=>setCurrency(e.target.value)}></input>
            <label htmlFor="usd">USD </label>
            <input type="radio" id="eur" name={currency}  value={"eur"} onChange={e=>setCurrency(e.target.value)}></input>
            <label htmlFor="eur">EUR </label>

        </div>

        <div className="detailContainer">
            <p>Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}</p>
            <img className="CoinDetailImage" src={coin.image.large} alt="imagenotdisplayed"/>
            <h4>{coin.name}</h4>
            <h4>{CurrencySymbol}{coin.market_data.current_price[currency]}</h4>
            <h4>{coin.market_data.price_change_percentage_24h > 0 ? "▲" : "▼" }{coin.market_data.price_change_percentage_24h}</h4>
            <h4 style={{fontSize: "30px"}}>{`#${coin.market_cap_rank}`}</h4>

            <form className='form'>
              <label htmlFor="vol" style={{color:"red",fontWeight:"bolder",fontSize: "14px"}}>{`${CurrencySymbol}${coin.market_data.low_24h[currency]}`}</label>
              <input className='range' type="range" id="vol" name="vol" 
              min={`${CurrencySymbol}${coin.market_data.low_24h[currency]}`} 
              max={`${CurrencySymbol}${coin.market_data.high_24h[currency]}`}></input>
              <label htmlFor="vol" style={{color:"green",fontWeight:"bolder",fontSize: "14px"}}>{`${CurrencySymbol}${coin.market_data.high_24h[currency]}`}</label>
            </form>

            <div className="textValuePair">
                <h4 style={{fontWeight:"medium"}}>{"Max Supply"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{coin.market_data.max_supply}</h4>
                <h4 style={{fontWeight:"medium"}}>{"Circulating Supply"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{coin.market_data.circulating_supply}</h4>
                <h4 style={{fontWeight:"medium"}}>{"Market Cap"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {`${CurrencySymbol}${coin.market_data.market_cap[currency]}`}</h4>
                <h4 style={{fontWeight:"medium"}}>{"All Time Low"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {`${CurrencySymbol}${coin.market_data.atl[currency]}`}
                </h4>
                <h4 style={{fontWeight:"medium"}}>{"All Time High"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {`${CurrencySymbol}${coin.market_data.ath[currency]}`}</h4>
               </div>  

        </div>

        </>
      }
      </>
      }
    </div>
  )
}

export default CoinDetails
