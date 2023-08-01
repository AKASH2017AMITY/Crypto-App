import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index.js'
import Loader from './Loader.jsx';
import './exchange.css'

function Exchange() {

    const [exchanges, setExchanges] = useState(() => (true ? [] : {}));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`);

                setExchanges(data);
                setLoading(false);

            } catch (error) {
                setError(true);
                setLoading(false);

            }
        };

        fetchExchanges();
    }, [])

    if (error) {
        return <h1>Error While Fetching Api</h1>
    }
    return (
        <div id="marginBottom" >
            {loading ? <Loader /> : <>
                <div >
                    {exchanges.map((i) => (
                        <ExchangeCard name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} key={i.id} />
                    ))}
                </div>
            </>}

        </div>
    )
}

export default Exchange;

const ExchangeCard = ({ name, img, rank, url }) => (
    <a href={url} target={"blank"} className='container' >
        <div className='card'>
            <img src={img} style={{ objectFit: "contain" }} alt="exchange"></img>
            <h1 className="heading">{rank}</h1>
            <h2 >{name}</h2>
        </div>

    </a>
)
