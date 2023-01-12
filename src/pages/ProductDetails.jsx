import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class ProductDetails extends Component {
  state = {
    productData: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      productData: await getProductById(id),
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/cartshop');
  };

  render() {
    const { productData: { title, price, thumbnail } } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{ title }</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-price">
          Price:
          { price }
        </p>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.handleClick }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};
