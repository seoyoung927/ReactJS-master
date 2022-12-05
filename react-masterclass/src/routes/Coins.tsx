import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    color: ${(props)=>props.theme.bgColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    a{
        transition: color 0.2s ease-in;
        display: block;
    }
    &: hover{
        a{
            color: ${(props)=>props.theme.accentColor}
        }
    }
`;
const Title = styled.h1`
    font-size: 40px;
    color: ${(props)=>props.theme.accentColor}
`;
const Loader = styled.span`
    font-size: 40px;
    color: ${(props)=>props.theme.textColor}
    text-align: center;
`;
// const coins= [
//     //https://api.coinpaprika.com/v1/coins
//     {"id":"btc-bitcoin","name":"Bitcoin","symbol":"BTC","rank":1,"is_new":false,"is_active":true,"type":"coin"},
//     {"id":"eth-ethereum","name":"Ethereum","symbol":"ETH","rank":2,"is_new":false,"is_active":true,"type":"coin"},
//     {"id":"usdt-tether","name":"Tether","symbol":"USDT","rank":3,"is_new":false,"is_active":true,"type":"token"}
// ];

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins(){
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const getCoins = async() => {
        const json = await(
            await(fetch('https://api.coinpaprika.com/v1/coins'))
        ).json();
        setCoins(json.slice(0,100));
        console.log(coins);
    }
    useEffect(()=>{
        getCoins();
        setLoading(false);
    },[]);
    

    return <Container>
        <Header>
            <Title>코인</Title>
        </Header>
        {loading ? <Loader>Loading...</Loader> :
            <CoinsList>
                {coins.map((coin)=>(<Coin key={coin.id}><Link to={`/${coin.id}`}>{coin.name} &rarr; </Link></Coin>))}
            </CoinsList>
        }
    </Container>;
}

export default Coins;