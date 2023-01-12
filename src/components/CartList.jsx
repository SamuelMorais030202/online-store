import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CartList extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        {
          data.map(({ id, title, price, thumbnail }) => (
            <div key={ id }>
              <img src={ thumbnail } alt="Produto Imagem" />
              <p
                data-testid="shopping-cart-product-name"
                className="title-product-saved"
              >
                { title }
              </p>
              <div className="row-saved">
                <p className="real-symbol-saved">
                  R$
                </p>
                <p className="price-product-saved">
                  { ((Math.round(price * 100) / 100).toFixed(2)).replace('.', ',') }
                </p>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

CartList.propTypes = {
  data: PropTypes.arrayOf.isRequired,
};
