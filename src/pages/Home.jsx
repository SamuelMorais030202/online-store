import React, { Component } from 'react';
import CategoriesFilter from '../components/CategoriesFilter';

export default class Home extends Component {
  render() {
    return (
      <main className="home-container">
        <CategoriesFilter />
        <div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
      </main>
    );
  }
}
