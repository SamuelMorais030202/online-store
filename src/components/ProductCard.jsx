import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/ProductCard.css';

export default class ProductCard extends Component {
  render() {
    const {
      data: {
        title,
        thumbnail,
        price,
        id,
        available_quantity: availableQuantity,
        shipping: {
          free_shipping: freeShipping,
        },
      },
      saveLocalStorage,
    } = this.props;
    return (
      <div>
        <div data-testid="product" className="product-card">
          <Link to={ `/product/${id}` } data-testid="product-detail-link">
            {
              freeShipping && <p data-testid="free-shipping">Frete Grátis</p>
            }
            <img
              src={ thumbnail }
              alt="Produto Imagem"
              className="product-card-image"
            />
            <p className="title-product">{ title }</p>
            <div className="row">
              <p className="real-symbol">
                R$
              </p>
              <p className="price-product">
                { ((Math.round(price * 100) / 100).toFixed(2)).replace('.', ',') }
              </p>
            </div>
          </Link>
          <button
            type="button"
            data-testid="product-add-to-cart"
            className="button-add-cart"
            onClick={ () => {
              saveLocalStorage({
                title, thumbnail, price, id, availableQuantity,
              });
            } }
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  data: PropTypes.shape().isRequired,
  saveLocalStorage: PropTypes.func.isRequired,
};
