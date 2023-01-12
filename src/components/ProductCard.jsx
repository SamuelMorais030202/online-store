import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/ProductCard.css';

export default class ProductCard extends Component {
  saveLocalStorage = () => {
    const { data: { title, thumbnail, price, id } } = this.props;

    const saveProduct = localStorage.getItem('saveProduct');

    const arrayProduct = saveProduct ? JSON.parse(saveProduct) : [];
    arrayProduct.push({ title, thumbnail, price, id });
    localStorage.setItem('saveProduct', JSON.stringify(arrayProduct));
    // return localStorage.getItem('saveProduct');
    /* console.log(localStorage.getItem('saveProduct')); */
  };

  render() {
    const { data: { title, thumbnail, price, id } } = this.props;
    return (
      <div>
        <Link to={ `/product-details/${id}` } data-testid="product-detail-link">
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

          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          className="button-add-cart"
          onClick={ this.saveLocalStorage }
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
