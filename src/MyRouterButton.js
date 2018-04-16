import React, { Component } from 'react';
import ReactDom from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Plot from 'react-function-plot';
import { Route } from 'react-router-dom';
// this also works with react-router-native

// const Btn = () => (
//   <Route render={({ history}) => (
//     <button
//       type='button'
//       onClick={() => { history.push('/requests') }}
//     >
//       Click Me!
//     </button>
//   )} />
// );

class Btn extends Component {
  render() {
    return (
      <Route render={({ history}) => (
        <button
          type='button'
          onClick={() => { history.push('/requests') }}
        >
          Click Me!
        </button>
      )} />
    );
  }
}

export default Btn;
