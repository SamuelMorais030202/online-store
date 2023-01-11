import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import searchImage from '../img/lupa.png';
import logoImage from '../img/logo.png';
import cartImage from '../img/cart.png';

export default class Header extends Component {
  state = {
    query: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      query: value,
    });
  };

  render() {
    const { query } = this.state;
    const { handleSearch } = this.props;
    return (
      <header className="header-search">
        <div className="search-box">
          <input
            type="text"
            data-testid="query-input"
            onChange={ this.handleChange }
            value={ query }
            placeholder="Digite o que você busca"
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ () => { handleSearch(query); } }
          >
            <img src={ searchImage } alt="" />
          </button>
        </div>
        <img src={ logoImage } alt="Logo" className="logo-image" />
        <Link to="/cartshop" className="cart-link" data-testid="shopping-cart-button">
          <img src={ cartImage } alt="Cart-Icon" />
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
