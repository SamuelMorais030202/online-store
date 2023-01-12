import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/ProductCard.css';

export default class ProductCard extends Component {
  render() {
    const { data: { title, thumbnail, price } } = this.props;
    return (
      <div data-testid="product" className="product-card">
        <img src={ thumbnail } alt="Produto Imagem" />
        <p className="title-product">{ title }</p>
        <div className="row">
          <p className="real-symbol">
            R$
          </p>
          <p className="price-product">
            { ((Math.round(price * 100) / 100).toFixed(2)).replace('.', ',') }
          </p>
        </div>
        <button
          type="button"
          data-testid="product-add-to-cart"
          className="button-add-cart"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  data: PropTypes.shape().isRequired,
};
