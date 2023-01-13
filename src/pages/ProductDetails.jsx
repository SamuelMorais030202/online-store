import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById, getProductDescription } from '../services/api';
import Header from '../components/Header';
import RatingForm from '../components/RatingForm';
import backImage from '../img/back-arrow.png';
import QuantityControl from '../components/QuantityControl';
import './css/ProductDetails.css';

export default class ProductDetails extends Component {
  state = {
    productData: {},
    description: '',
    quantity: 1,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      productData: await getProductById(id),
      description: await getProductDescription(id),
    });
  }

  handleClick = () => {
    const { history } = this.props;
    const { productData: { title, price, thumbnail, id } } = this.state;
    const saveProduct = localStorage.getItem('saveProduct');
    const arrayProduct = saveProduct ? JSON.parse(saveProduct) : [];
    arrayProduct.push({ title, thumbnail, price, id, quantity: 1 });
    localStorage.setItem('saveProduct', JSON.stringify(arrayProduct));
    history.push('/cartshop');
  };

  render() {
    const {
      productData: { title, price, pictures },
      quantity,
      description,
    } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <div className="product-details">
        <Header />
        <div className="product-resume">
          <Link to="/" className="cart-voltar">
            <button type="button" className="back-button">
              <img src={ backImage } alt="" />
              Voltar
            </button>
          </Link>
          <div className="product-image-container">
            <p data-testid="product-detail-name">{ title }</p>
            <img
              data-testid="product-detail-image"
              src={ pictures ? pictures[0].url : '' }
              alt={ title }
            />
          </div>
          <div className="product-info-container">
            <h1>Descrição</h1>
            <p
              className="product-description"
            >
              {
                description && description.plain_text
              }
            </p>
            <div className="row">
              <p
                data-testid="product-detail-price"
                className="product-detail-price"
              >
                R$
                {((Math.round(price * 100) / 100).toFixed(2)).replace('.', ',')}
              </p>
              <QuantityControl
                updateQuantity={ (bool) => {
                  if (bool) {
                    this.setState({
                      quantity: quantity + 1,
                    });
                  } else {
                    this.setState({
                      quantity: quantity >= 2 ? quantity - 1 : quantity,
                    });
                  }
                } }
                quantity={ quantity }
              />
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                className="button-add-cart"
                onClick={ this.handleClick }
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
        <RatingForm id={ id } />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};
