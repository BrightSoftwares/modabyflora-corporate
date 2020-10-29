import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const One = () => (
  <div style={{ height: "100%", backgroundColor: "#D7B49E" }} />
);

const Two = () => (
  <div style={{ height: "100%", backgroundColor: "#DC602E" }} />
);

const Three = () => (
  <div style={{ height: "100%", backgroundColor: "#BC412B" }} />
);

ReactDOM.render(<One />, document.getElementById('one'));
ReactDOM.render(<Two />, document.getElementById('two'));
ReactDOM.render(<Three />, document.getElementById('three'));
ReactDOM.render(<App />, document.getElementById('four'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
