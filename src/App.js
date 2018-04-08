import React, { Component } from 'react';
import ReactDom from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Jumbotron } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Parallax, Background } from 'react-parallax';
import { Col, Row, Grid, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import Fox from './fox.jpg';
var BASE_URL =  "http://127.0.0.1:8080/";
var BIN_API = BASE_URL + "binance-info";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tradingFrom: 'Trading From',
      tradingTo: 'Trading To',
      result: '...'
    };
    this.retrieveValue = this.retrieveValue.bind(this);
    this.updateResult = this.updateResult.bind(this);
    this.updateTradingTo = this.updateTradingTo.bind(this);
    this.updateTradingFrom = this.updateTradingFrom.bind(this);
  }

  updateResult(str) {
    if (str != null) {
      this.setState({
        result: str,
      });
    }
  }

  updateTradingTo(str) {
    if (str != null) {
      this.setState({
        tradingTo: str,
      });
    }
  }
  updateTradingFrom(str) {
    if (str != null) {
      this.setState({
        tradingFrom: str,
      });
    }
  }

  retrieveValue() {
    console.log('App: retrieveValue executed...');

    let to = this.state.tradingTo;
    let from = this.state.tradingFrom;

    if (to != 'Trading To' && from != 'Trading From' && to != from) {
      let symbol = to + from;
      console.log("Submitting symbol: " + symbol);
      //  Make Server Request
      axios.get(BIN_API, {
            params: {
                symbol: symbol,
            }
        }).then((response) => {
          this.updateResult(response.data);
          console.log("this.state.result is now " + this.state.result);
        })
        .catch((error) => {
          console.log(error);
          this.updateResult("ERROR");
        });
    } else {
      alert('Bag is NOT secured...');
    }
   }



  render() {
    return (
      <div className="App">
        <Parallax className='par'
          blur={6}
          bgImage={Fox}
          bgImageAlt="Fox"
          strength={200}
          >
          <h1>Welcome</h1>
          <div style={{ height: '200px' }} />
        </Parallax>
        <Jumbotron>
          <h2 className="App-Text">The following is a <strong>Ryan Cocuzzo </strong>website.</h2>
        </Jumbotron>
        <hr></hr>

      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={4} className="isAColumn">
            <h1>||  Ya know horses dont stop they keey goin  || </h1>
            <p> We kept our last few hundreds 🏝</p>
          </Col>
          <Col xs={12} md={4} className="isAColumn">
            <h1>||  We ran out da digits ||</h1>
            <p> Spread out just like a fan 🏝</p>
          </Col>
          <Col xs={12} md={4} className="isAColumn">
            <h1>||  We ran out some 💰 ||</h1>
            <p> she memorized my #, same one from 2 thousand 10 🏝</p>
          </Col>
        </Row>
      </Grid>
      <hr></hr>

      <ButtonToolbar>
        <DropdownButton
          bsStyle={'primary'}
          title={this.state.tradingTo}
          key={1}
          id={`tradeToDD`}
        >
          <MenuItem eventKey="1" onClick={() => {this.updateTradingTo('ETH')}}>ETH</MenuItem>
          <MenuItem eventKey="2" onClick={() => {this.updateTradingTo('LTC')}}>LTC</MenuItem>
          <MenuItem eventKey="3" onClick={() => {this.updateTradingTo('BTC')}}>BTC</MenuItem>

        </DropdownButton>
        <DropdownButton
          bsStyle={'primary'}
          title={this.state.tradingFrom}
          key={2}
          id={`tradeFromDD`}
        >
          <MenuItem eventKey="1" onClick={() => {this.updateTradingFrom('USD')}}>USD</MenuItem>
          <MenuItem eventKey="2" onClick={() => {this.updateTradingFrom('ETH')}}>ETH</MenuItem>
          <MenuItem eventKey="3" onClick={() => {this.updateTradingFrom('LTC')}}>LTC</MenuItem>
          <MenuItem eventKey="4" onClick={() => {this.updateTradingFrom('BTC')}}>BTC</MenuItem>
        </DropdownButton>
          <Button bsStyle={'default'} onClick={this.retrieveValue}> Retrieve Value </Button>
        </ButtonToolbar>

        <div className="TXTAREA">
          <p className="TA-p">{this.state.result}</p>
        </div>
        <Jumbotron>
          <h1 className="App-Text">but wait..</h1>
        </Jumbotron>
        <Jumbotron>
          <h1 className="App-Text">theres more!</h1>
        </Jumbotron>

      </div>
    );
  }
}


export default App;
