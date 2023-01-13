import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CartShop from './pages/CartShop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/cartshop" component={ CartShop } />
      <Route path="/product/:id" component={ ProductDetails } />
      <Route exact path="/checkout" component={ Checkout } />
    </Switch>
  );
}

export default App;
