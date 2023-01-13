import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class QuantityControl extends Component {
  render() {
    const { updateQuantity, quantity } = this.props;
    return (
      <div
        className="container-quantity"
      >
        <button
          type="button"
          className="button-quantity"
          data-testid="product-decrease-quantity"
          onClick={ () => {
            updateQuantity(false);
          } }
        >
          -
        </button>
        <p
          className="quantity-product-saved"
          data-testid="shopping-cart-product-quantity"
        >
          {quantity}
        </p>
        <button
          type="button"
          className="button-quantity"
          data-testid="product-increase-quantity"
          onClick={ () => {
            updateQuantity(true);
          } }
        >
          +
        </button>
      </div>
    );
  }
}

QuantityControl.propTypes = {
  updateQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};
