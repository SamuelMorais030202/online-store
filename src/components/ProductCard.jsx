import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { data: { title, thumbnail, price } } = this.props;
    return (
      <div data-testid="product">
        ProductCard
        <p>{ title }</p>
        <img src={ thumbnail } alt="Produto Imagem" />
        <p>
          Preço
          { price }
        </p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  data: PropTypes.shape().isRequired,
};
