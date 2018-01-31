import React, { Component } from 'react';
import { fetchCurrencyData } from '../utils/api';
import '../App.css';
import { images } from '../utils/CoinIcons';


function CryptoGrid({cryptoData}){
  // console.log(JSON.stringify(cryptoData))
  return (
    cryptoData.map(({symbol, id, price_usd}) => {

      return (
        <div className="crypto_container">
          <img className="coin_icon" src={images[symbol]} alt={id} />
          <div>${price_usd}</div>
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
