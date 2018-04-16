import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './App.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
