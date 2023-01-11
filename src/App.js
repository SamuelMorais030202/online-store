import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CartShop from './pages/CartShop';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cartshop" component={ CartShop } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
