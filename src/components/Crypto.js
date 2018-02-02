import React, { Component } from 'react';
import { fetchCurrencyData, importAll } from '../utils/api';
import { format as formatCurrency } from 'currency-formatter';
import '../App.css';


function CryptoGrid({cryptoData}){
  const images = importAll(require.context('../images/icons', false, /\.(png|jpe?g|svg)$/));

  return (
    cryptoData.map(({id, name, symbol, rank, market_cap_usd, price_usd, percent_change_24h}) => {
      const imgFile = symbol.toLowerCase()+".svg";

      return (
        <div className="crypto_container" key={id}>

          <div className="coin_rank">
            {rank}
          </div>
          <p className="coin_name">
            {name} ({symbol})
          </p>
          <div className="icon_container">
            <img className="coin_icon" src={images[imgFile]} alt={id} />
          </div>
          <div className="data_container">
            <p className="coin_price">
              {formatCurrency(price_usd, { code: 'USD' } )}
            </p>
            <div className="coin_change"
              style={percent_change_24h >= 0 ? {color: '#32CD32'} : {color: 'red'}}>
              {percent_change_24h}%
            </div>
            <p>
              {formatCurrency(market_cap_usd, { code: 'USD' } )}
            </p>
          </div>

        </div>
      );
    })
  )
}

function Filter(props){

  return(
    <div>
      <select onChange={props.filterChange}>
        <option>Rank</option>
        <option>Price</option>
        <option>Percent</option>
      </select>
    </div>
  )
}


class Crypto extends Component{

  state = {
    data : null,
    filterBy: "rank"
  }

  componentDidMount(){
    this.loadCrypto();
  }


//setters
  setData = (data) => {
    this.setState(() => ({ data }));
  }

  setFilter = (filterBy) => {
    this.setState(() => ({ filterBy }),
      () => { this.filter() }
    );
  }

//component functions
  loadCrypto = async () => {
    const data = await fetchCurrencyData();
    this.setState(() => ({ data }));
  }

  filter = () => {
    let searchBy;
    let { data } = this.state;
    const { filterBy } = this.state;


    switch (this.state.filterBy){
      case 'Percent':
        searchBy = "percent_change_24h";
        break;
      case 'Price':
        searchBy = "price_usd";
        break;
      case 'Rank':
      default:
        searchBy = "rank";
        break;
    }

    data = data.sort((a, b) => {
      return searchBy !== "rank" ? b[searchBy] - a[searchBy] : a[searchBy] - b[searchBy];
    });

    this.setData(data);

  }

//events
  changeFilter = (event) => {
    const { value } = event.target;
    this.setFilter(value);
  }

  render(){
    return (

      this.state.data
        ? <div>
            <div className="filter">
              <Filter filterChange={this.changeFilter} />
            </div>
            <div className="crypto_grid">
              <CryptoGrid cryptoData={this.state.data} />
            </div>
          </div>

        : ""

    )
  }
}


export default Crypto;
