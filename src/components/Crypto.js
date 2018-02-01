import React, { Component } from 'react';
import { fetchCurrencyData, importAll } from '../utils/api';
import '../App.css';
// import up from '../images/up.svg';
// import down from '../images/down.svg';


function CryptoGrid({cryptoData}){
  console.log(cryptoData);
  const images = importAll(require.context('../images/icons', false, /\.(png|jpe?g|svg)$/));
  return (
    cryptoData.map(({id, name, symbol, rank, market_cap_usd, price_usd, percent_change_24h}) => {
      const imgFile = symbol.toLowerCase()+".svg";
      const upDown = percent_change_24h >= 0 ? "^" : "v";

      return (
        <div className="crypto_container" key={id}>
          <div className="coin_rank">{rank}</div>
          <p className="coin_name">{name} ({symbol})</p>
          <div className="icon_container">
            <img className="coin_icon" src={images[imgFile]} alt={id} />
          </div>
          <div className="data_container">
            <p className="coin_price">${price_usd}</p>
            <div className="coin_change" style={percent_change_24h >= 0 ? {color: '#32CD32'} : {color: 'red'}}>
              {percent_change_24h}%

            </div>
            <p>M-Cap: {market_cap_usd}</p>
          </div>
        </div>
      );
    })
  )
}


class Crypto extends Component{

  state = {
    data : null
  }

  componentDidMount(){
    this.loadCrypto();
  }

  loadCrypto = async () => {
    const data = await fetchCurrencyData();
    this.setState(() => ({ data }));
  }

  render(){
    return (
      this.state.data
        ? <div className="crypto_grid"><CryptoGrid cryptoData={this.state.data} /></div>
        : ""

    )
  }
}


export default Crypto;
