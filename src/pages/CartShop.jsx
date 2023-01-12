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
    }, () => {
      const { savedProduct } = this.state;
      this.calculateTotal(savedProduct);
    });
  }

  calculateTotal = (productList) => {
    let currentTotal = 0;

    productList.forEach(({ quantity, price }) => {
      currentTotal = Math.round(((quantity * price) + currentTotal) * 100) / 100;
    });

    this.setState({
      total: (currentTotal).toFixed(2),
    });

    localStorage.setItem('totalBuy', currentTotal);
  };

  render() {
    const { savedProduct, total } = this.state;
    return (
      <div className="cart-shop">
        <Header />
        <div className="cart-resume">
          <Link to="/" className="cart-voltar">
            <button type="button" className="back-button">
              <img src={ backImage } alt="" />
              Voltar
            </button>
          </Link>
          {
            savedProduct && savedProduct.length > 0 ? (
              <>
                <div className="container-cart">
                  <CartList data={ savedProduct } funcCalculate={ this.calculateTotal } />
                </div>
                <div className="cart-total">
                  <h1 className="cart-total-title">Valor total da compra:</h1>
                  <h2 className="cart-total-price">
                    R$
                    { total }
                  </h2>
                  <Link to="/checkout">
                    <button
                      type="button"
                      className="button-cart-total"
                      data-testid="checkout-products"
                    >
                      Finalizar compra
                    </button>
                  </Link>
                </div>
              </>
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
