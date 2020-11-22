import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App/App';
import * as serviceWorker from './serviceWorker';
import { LoginPage } from './LoginPage';
import { CartPage } from './CartPage';
// import { configureFakeBackend } from './helpers';

// // Configure the fake backend for tests
// configureFakeBackend();

const One = () => (
  <div style={{ height: "100%", backgroundColor: "#D7B49E" }} />
);

const Two = () => (
  <div style={{ height: "100%", backgroundColor: "#DC602E" }} />
);

const Three = () => (
  <div style={{ height: "100%", backgroundColor: "#BC412B" }} />
);

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("Loading react components ...");


  // Load login element only if the page is found
  var loginElement = document.getElementById("navbar-login-link");
  if(typeof(loginElement) !== 'undefined' && loginElement !== null){
    console.log("Found login element");
    ReactDOM.render(<LoginPage />, loginElement);
  } else{
    console.log('Login element not found!');
  }
  
  // Load cart element only if the page is found
  var cartElement = document.getElementById("navbar-cart-link");
  if(typeof(cartElement) !== 'undefined' && cartElement !== null){
    console.log("Found cart element");
    ReactDOM.render(<CartPage />, cartElement);
  } else{
    console.log('Cart element not found!');
  }

  ReactDOM.render(<App />, document.getElementById('one'));
  console.log("... Done");
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

