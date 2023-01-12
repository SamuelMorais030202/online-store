import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CartList extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        {
          data.map(({ id, title, price, thumbnail, quantity }) => (
            <div key={ id }>
              <img src={ thumbnail } alt="Produto Imagem" />
              <p
                data-testid="shopping-cart-product-name"
                className="title-product-saved"
              >
                { title }
              </p>
              <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
              <p className="price-product-saved">
                R$
                { ((Math.round(price * 100) / 100).toFixed(2)).replace('.', ',') }
              </p>
            </div>
          ))
        }
      </div>
    );
  }
}

CartList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
