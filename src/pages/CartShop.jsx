import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartList from '../components/CartList';
import Header from '../components/Header';
import backImage from '../img/back-arrow.png';
import './css/CartShop.css';

export default class CartShop extends Component {
  state = {
    savedProduct: [],
    total: 0,
  };

  componentDidMount() {
    const receiveData = localStorage.getItem('saveProduct');
    this.setState({
      savedProduct: receiveData ? JSON.parse(receiveData) : [],
    });
  }

  calculateTotal = (savedProducts) => {
    return savedProducts;
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
          <div className="cart-shop">
            {
              savedProduct && savedProduct.length > 0 ? (
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
            <button></button>
          </div>
        </div>
      </div>
    );
  }
}
