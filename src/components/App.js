import React, { Component } from 'react';
import Crypto from './Crypto';
import '../App.css';

class App extends Component {

  render() {
    return (
      <div className="container">
        <div className="top_bar">
          <h1>CoinGander.</h1>
        </div>
        <Crypto />
      </div>
    );
  }
}

export default App;
