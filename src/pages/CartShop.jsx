import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartList from '../components/CartList';
import Header from '../components/Header';
import backImage from '../img/back-arrow.png';
import './css/CartShop.css';

export default class CartShop extends Component {
  state = {
    savedProduct: [],
  };

  componentDidMount() {
    const receiveData = localStorage.getItem('saveProduct');
    this.setState({
      savedProduct: receiveData ? JSON.parse(receiveData) : [],
    });
  }

  render() {
    const { savedProduct } = this.state;
    return (
      <div className="container-cart">
        <Header />
        <div className="cart-products">
          <Link to="/" className="cart-voltar">
            <button type="button" className="back-button">
              <img src={ backImage } alt="" />
              Voltar
            </button>
          </Link>
          {
            savedProduct ? (
              <CartList data={ savedProduct } />
            ) : (
              <h1
                data-testid="shopping-cart-empty-message"
                className="cart-message"
              >
                Seu carrinho está vazio
              </h1>
            )
          }

        </div>
      </div>
    );
  }
}
