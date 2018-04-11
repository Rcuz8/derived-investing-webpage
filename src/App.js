import React, { Component } from 'react';
import ReactDom from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Jumbotron } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Parallax, Background } from 'react-parallax';
import { Col, Row, Grid, DropdownButton, MenuItem, ButtonToolbar, Well } from 'react-bootstrap';
import Fox from './fox.jpg';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';

var css = {
  color: 'red',
};

var BASE_URL =  "http://127.0.0.1:8080/";
var BIN_API = BASE_URL + "binance-info";
var COINAPI = BASE_URL + "tradeInfo";
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
      axios.get(COINAPI, {
            params: {
                tradingTo: to,
                tradingFrom: from,
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
          <ScrollAnimation animateIn="slideInRight" animateOnce={true} viewport={1} duration={1} delay={0} className="scroll">
              <h2 className="App-Text">The following is a <strong>Ryan Cocuzzo </strong>website.</h2>
          </ScrollAnimation>
        </Jumbotron>
        <hr></hr>
        <ScrollAnimation animateIn="slideInRight" animateOnce={true} viewport={1} duration={1} delay={0} className="scroll">
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={4} className="isAColumn">
            <h1>Motivation</h1>
            <p> qwerty keyboards are used mostly for typing 🏝 and everyone knows that there are less leys than there are ideas in the world.</p>
          </Col>
          <Col xs={12} md={4} className="isAColumn">
            <h1>Incentive</h1>
            <p> qwerty keyboards are used mostly for typing 🏝 and everyone knows that there are less leys than there are ideas in the world.</p>
          </Col>
          <Col xs={12} md={4} className="isAColumn">
            <h1>Inclusion</h1>
            <p> qwerty keyboards are used mostly for typing 🏝 and everyone knows that there are less leys than there are ideas in the world.</p>
          </Col>
        </Row>
      </Grid>
      <hr></hr>

      <ButtonToolbar className="toolbar">
        <DropdownButton
          bsStyle={'default'}
          title={this.state.tradingTo}
          key={1}
          id={`tradeToDD`}
        >
          <MenuItem eventKey="1" onClick={() => {this.updateTradingTo('ETH')}}>ETH</MenuItem>
          <MenuItem eventKey="2" onClick={() => {this.updateTradingTo('LTC')}}>LTC</MenuItem>
          <MenuItem eventKey="3" onClick={() => {this.updateTradingTo('BTC')}}>BTC</MenuItem>

        </DropdownButton>
        <DropdownButton
          bsStyle={'default'}
          title={this.state.tradingFrom}
          key={2}
          block
        >
          <MenuItem eventKey="1" onClick={() => {this.updateTradingFrom('USD')}}>USD</MenuItem>
          <MenuItem eventKey="2" onClick={() => {this.updateTradingFrom('ETH')}}>ETH</MenuItem>
          <MenuItem eventKey="3" onClick={() => {this.updateTradingFrom('LTC')}}>LTC</MenuItem>
          <MenuItem eventKey="4" onClick={() => {this.updateTradingFrom('BTC')}}>BTC</MenuItem>
        </DropdownButton>
          <Button bsStyle={'default'} onClick={this.retrieveValue}> Retrieve Value </Button>
        </ButtonToolbar>
      </ScrollAnimation>
        <div className="TXTAREA">
          <p className="TA-p">{this.state.result}</p>
        </div>
        <br></br>
        <h3 className='new-section'>
          Source Code
        </h3>
        <hr></hr>
        <Well bsSize="large">
          <pre>
          <code>
            <xmp id="container">

              &lt;xmp &gt;
              &lt;ScrollAnimation animateIn="bounceIn" viewport={1} duration={1} delay={0}&gt; &#13;
                          &lt;p&gt;something can never be nothing ball&lt;/p&gt; &#13;
                          &lt;h4&gt;something can never be nothing ball&lt;/h4&gt; &#13;
                          &lt;h4&gt;something can never be nothing ball&lt;/h4&gt; &#13;

                      &lt;/ScrollAnimation&gt;
              &lt;/xmp &gt;

            </xmp>
          </code>
        </pre>
        </Well>
        <ScrollAnimation animateIn="bounceIn" viewport={1} duration={1} delay={0} className="scroll">
            <p>something can never be nothing ball</p>
            <h4>something can never be nothing ball</h4>
            <h4>something can never be nothing ball</h4>
        </ScrollAnimation>
        <br></br>
        <br></br>
        <br></br>
        <Jumbotron>
          <h1 className="App-Text">theres more!</h1>
        </Jumbotron>
        <br></br>
        <br></br>
      </div>
    );
  }
}


export default App;
