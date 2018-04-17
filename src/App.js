import React, { Component } from 'react';
import ReactDom from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Jumbotron } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Parallax, Background } from 'react-parallax';
import { Col, Row, Grid, DropdownButton, MenuItem, ButtonToolbar, Well, Navbar, NavItem, NavDropdown, Nav } from 'react-bootstrap';
import Fox from './fox.jpg';
import Apple from './img/apple-logo.png';
import btc from './img/btc.png';
import bg2 from './img/bg2.jpeg';
import ibm from './img/ibm.png';
import amazon from './img/amazonn.png';
import google from './img/google.png';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import Plot from 'react-function-plot';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, ResponsiveContainer, AreaChart, Area, ReferenceLine, Cell, BarChart, Bar, LabelList} from 'recharts';
import Typing from 'react-typing-animation';
import TypeWriter from 'react-typewriter';
import Moment from 'react-moment';
var css = {
  color: 'red',
};

var LOCALHOST_URL =  "http://127.0.0.1:8080/";
var HEROKU_URL = 'https://git.heroku.com/gentle-crag-38927.git/';
var COINAPI = LOCALHOST_URL + "tradeInfo";

var chartData = [
  { name: 14, y: 2 },
  { name: 15, y: 4 },
  { name: 15, y: 6 },
  { name: 20, y: 8 },
  { name: 15, y: 10 },
]
const data = [
      {name: 'January', 'Net Profit': 4000, 'Our Money': 1000, 'Opponent Money': 5000, 'Opponent Success': 5000},
      {name: 'February', 'Net Profit': 8000, 'Our Money': 2000, 'Opponent Money': 4000, 'Opponent Success': 4000},
      {name: 'March', 'Net Profit': 16000, 'Our Money': 4000, 'Opponent Money': 3000, 'Opponent Success': 3000},
      {name: 'April', 'Net Profit': 32000, 'Our Money': 8000, 'Opponent Money': 2000, 'Opponent Success': 2000},
      {name: 'May', 'Net Profit': 64000, 'Our Money': 16000, 'Opponent Money': 1500, 'Opponent Success': 1000},
      {name: 'June', 'Net Profit': 128000, 'Our Money': 32000, 'Opponent Money': 1000, 'Opponent Success': 1000},

];
const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]
const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
                  {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
                  {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

                  const data03 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                                    {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
                  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
                  const BLUE_COLORS = ['#004e63', '#006e8c', '#00b8e6', '#4dd7fa'];
                  const RED_COLORS = ['#990000', '#ff1a1a', '#ff8080', '#ffe6e6'];
                  const PINK_COLORS = ['#99004d', '#d147a3', '#ff80bf', '#ffb3e6'];
                  const RADIAN = Math.PI / 180;

class MyCustomChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
    var data = JSON.stringify(props.data);
    console.log('this.state.data is now: ' + data)
  }
  render() {
    return (
    <LineChart width={800} height={400} data={this.props.data}
          margin={{top: 95, right: 20, left: 20, bottom: 15}}>
     <XAxis dataKey="name"/>
     <YAxis/>
     <CartesianGrid strokeDasharray="3 3"/>
     <Tooltip/>
     <Legend />
     <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{r: 8}}/>
     {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  )};
}

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
        {value.split(' ')[1]}
      </text>
    </g>
  );
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tradingFrom: 'Trading From',
      tradingTo: 'Trading To',
      result: '...',
      activeFunction: '2x',
      data: {}
    };
    this.retrieveValue = this.retrieveValue.bind(this);
    this.updateResult = this.updateResult.bind(this);
    this.updateTradingTo = this.updateTradingTo.bind(this);
    this.updateTradingFrom = this.updateTradingFrom.bind(this);
    this.functionFromExpression = this.functionFromExpression.bind(this);
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
  functionFromExpression(x) {
    return 2*x;
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
          var unformatted_data = response.data;
          var data = JSON.stringify(unformatted_data);
      //      chartData = data;
            ReactDom.render(<MyCustomChart data={unformatted_data} className='MyCustomChart'/>, document.getElementById('chahts'));

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
        <Navbar inverse fixedTop collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Web Page</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">
              Home
            </NavItem>
            <NavItem eventKey={2} href="#">
              About Us
            </NavItem>
            <NavItem pullRight>
              Christmas is&nbsp;
              <Moment fromNow>{ Date.parse("Dec 25, 2018")}</Moment>
            </NavItem>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Parallax className='par'
          blur={6}
          bgImage={Fox}
          bgImageAlt="Fox"
          strength={200}
          >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <TypeWriter typing={0.3} style={{margin: '10px'}}>
              <span style={{font: '60px courier'}}>Welcome, friend.</span>
            </TypeWriter>
          <div style={{ height: '200px' }} />
        </Parallax>
        <Jumbotron id='firstJumbo'>
          <ScrollAnimation animateIn="slideInRight" animateOnce={true} viewport={1} duration={1} delay={0} className="scroll">
              <h2 className="App-Text">The following is a <strong>Ryan Cocuzzo </strong>website.</h2>
          </ScrollAnimation>
        </Jumbotron>

        <ScrollAnimation animateIn="slideInRight" animateOnce={true} viewport={1} duration={1} delay={0} className="scroll">
          <Grid>
        <Row className="show-grid">
          <Col xs={12} md={4} className="isAColumn">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart onMouseEnter={this.onPieEnter}>
              <Pie stroke="none" fill="red"
                data={data03}
                className='pie2'
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={0}
              >
              	{
                	data03.map((entry, index) => <Cell fill={PINK_COLORS[index % PINK_COLORS.length]}/>)
                }
              </Pie>
              <Tooltip/>
            </PieChart>
            </ResponsiveContainer>
            <h1>Connectivity</h1>
            <p> Connection is fundamental in any product. In our distributed peer-to-peer systems, we place a heavy emphasis on connections by connecting our connections. We supplement this by further connecting the connections that connect the connections.</p>
          </Col>
          <Col xs={12} md={4} className="isAColumn">
            <ScrollAnimation animateIn="bounceIn" viewport={1} duration={1} delay={0} className="scroll">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart onMouseEnter={this.onPieEnter}>
              <Pie stroke="none" fill="red"
                data={data03}
                className='pie2'
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={0}
              >
              	{
                	data03.map((entry, index) => <Cell fill={BLUE_COLORS[index % BLUE_COLORS.length]}/>)
                }
              </Pie>
              <Tooltip/>
            </PieChart>
            </ResponsiveContainer>
          </ScrollAnimation>
            <h1>Responsiveness</h1>
            <p> Agility. Reactivity. Quickness. Each of these are characteristics of a Pronghorn Antelope. We accesorize our products with the lightweight, logically-efficient code and robust APIs in a similar way in which one could accesorize an antelope.</p>
          </Col>
          <Col xs={12} md={4} className="isAColumn">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart onMouseEnter={this.onPieEnter}>
              <Pie stroke="none" fill="red"
                data={data03}
                className='pie2'
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={0}
              >
              	{
                	data03.map((entry, index) => <Cell fill={RED_COLORS[index % RED_COLORS.length]}/>)
                }
              </Pie>
              <Tooltip/>
            </PieChart>
            </ResponsiveContainer>
            <h1>Explosiveness</h1>
            <p> The most dispositional value of the custom solutions we offer is stability. Although we operate predominantly in the software industry, we do extensive testing to make sure our products rate amongst the lowest in explosiveness. This ensures our clients use the most stabile software in the industry.</p>
          </Col>
        </Row>
          </Grid>
      </ScrollAnimation>
      <div className="exchange-view">

      <ScrollAnimation animateIn="slideInRight" animateOnce={true} viewport={1} duration={1} delay={0} className="scroll">
        <Grid>
          <Row>
            <Col xs={4} md={4} lg={4}>
              <h2 style={{color: 'black'}}>Exchange Rate Charting</h2>
            </Col>
            <Col xs={8} md={8} lg={8}>
            <ButtonToolbar className="toolbar">
              <DropdownButton
                bsStyle={'default'}
                title={this.state.tradingTo}
                key={1}
                id={`tradeToDD`}
                className='xx'
              >
                <MenuItem eventKey="1" onClick={() => {this.updateTradingTo('ETH')}}>ETH</MenuItem>
                <MenuItem eventKey="2" onClick={() => {this.updateTradingTo('LTC')}}>LTC</MenuItem>
                <MenuItem eventKey="3" onClick={() => {this.updateTradingTo('BTC')}}>BTC</MenuItem>

              </DropdownButton>
              <DropdownButton
                bsStyle={'default'}
                title={this.state.tradingFrom}
                key={2}

                id={`tradeFromDD`}
              >
                <MenuItem eventKey="1" onClick={() => {this.updateTradingFrom('USD')}}>USD</MenuItem>
                <MenuItem eventKey="2" onClick={() => {this.updateTradingFrom('ETH')}}>ETH</MenuItem>
                <MenuItem eventKey="3" onClick={() => {this.updateTradingFrom('LTC')}}>LTC</MenuItem>
                <MenuItem eventKey="4" onClick={() => {this.updateTradingFrom('BTC')}}>BTC</MenuItem>
              </DropdownButton>
                <Button id={`retrVal`} bsStyle={'default'} onClick={this.retrieveValue}> Retrieve Value </Button>
              </ButtonToolbar>
              <br></br>
              <br></br>
            </Col>
          </Row>
        </Grid>

        <br></br>



      <div id="chahts"></div>

      <br></br><br></br>
      </ScrollAnimation>
      </div>
      <Parallax className='par'
        blur={6}
        bgImage={bg2}
        bgImageAlt="bg2"
        strength={300}
        >
          <br></br>
          <br></br>
          <h2>Great 2001 Investments</h2>
          <br></br>
          <br></br>
          <br></br>

          <br></br>

        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={6}>
              <img src={google} className="constrained"></img>
            </Col>
            <Col xs={6} md={6}>
              <img src={btc} className="constrained"></img>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={6}>
              <img src={ibm} className="constrained"></img>
            </Col>
            <Col xs={6} md={6}>
              <img src={amazon} className="constrained"></img>
            </Col>
          </Row>
        </Grid>
        <div style={{ height: '100px' }} />
      </Parallax>

        {/* <div className="TXTAREA">
          <p className="TA-p">{this.state.result}</p>
        </div> */}
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
        <br></br>
        <br></br>
        <br></br>
        <h2>Data Analytics</h2>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <ScrollAnimation animateIn="slideInRight" animateOnce={true} viewport={1} duration={1} delay={0} className="scroll">
          <Grid>
            <Row className="show-grid">

              <Col xs={12} md={6} className="isAColumn">
            <h1>Our Sales Projections</h1>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={600} height={300} data={data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <CartesianGrid/>
                 <XAxis dataKey="name"/>
                 <YAxis/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="Net Profit" stackId='a' fill="#8884d8" />
                 <Bar dataKey="Our Money" stackId='a' fill="#82ca9d" />

              </BarChart>
            </ResponsiveContainer>

            <p> The most dispositional value of the custom solutions we offer is stability. Although we operate predominantly in the software industry, we do extensive testing to make sure our products rate amongst the lowest in explosiveness. This ensures our clients use the most stabile software in the industry.</p>
            </Col>
            <Col xs={12} md={6} className="isAColumn">
            <h1>Our Competitors</h1>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={600} height={300} data={data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <CartesianGrid/>
                 <XAxis dataKey="name"/>
                 <YAxis/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="Opponent Money" stackId='b' fill="#8884d8" />
                 <Bar dataKey="Opponent Success" stackId='b' fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>

            <p> The most dispositional value of the custom solutions we offer is stability. Although we operate predominantly in the software industry, we do extensive testing to make sure our products rate amongst the lowest in explosiveness. This ensures our clients use the most stabile software in the industry.</p>
            </Col>
            </Row>
            <Row className="show-grid">

              <Col xs={12} md={6} className="isAColumn">
            <h1>Our Sales Projections</h1>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={600} height={300} data={data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <CartesianGrid/>
                 <XAxis dataKey="name"/>
                 <YAxis/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="Net Profit" stackId='a' fill="#8884d8" />
                 <Bar dataKey="Our Money" stackId='a' fill="#82ca9d" />

              </BarChart>
            </ResponsiveContainer>

            <p> The most dispositional value of the custom solutions we offer is stability. Although we operate predominantly in the software industry, we do extensive testing to make sure our products rate amongst the lowest in explosiveness. This ensures our clients use the most stabile software in the industry.</p>
            </Col>
            <Col xs={12} md={6} className="isAColumn">
            <h1>Our Competitors</h1>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={600} height={300} data={data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <CartesianGrid/>
                 <XAxis dataKey="name"/>
                 <YAxis/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="Opponent Money" stackId='b' fill="#8884d8" />
                 <Bar dataKey="Opponent Success" stackId='b' fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>

            <p> The most dispositional value of the custom solutions we offer is stability. Although we operate predominantly in the software industry, we do extensive testing to make sure our products rate amongst the lowest in explosiveness. This ensures our clients use the most stabile software in the industry.</p>
            </Col>
            </Row>
          </Grid>
      </ScrollAnimation>

        <hr></hr>


      </div>
    );
  }
}



export default App;
