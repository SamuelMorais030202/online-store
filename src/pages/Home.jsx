import React, { Component } from 'react';
import CategoriesFilter from '../components/CategoriesFilter';
import Header from '../components/Header';
import './css/Home.css';
import { getProductsFromCategoryAndQuery, getProductByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';

export default class Home extends Component {
  state = {
    categorySelected: '',
    productsFiltered: undefined,
  };

  handleSearch = async (textSearch) => {
    const { categorySelected } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(
      categorySelected,
      textSearch,
    );
    results.sort((a, b) => a.id > b.id);
    this.setState({
      productsFiltered: [...results],
    });
  };

  handleChangeCategory = async (categoryId) => {
    this.setState({
      categorySelected: categoryId,
    });
    const { results } = await getProductByCategory(categoryId);
    results.sort((a, b) => a.id > b.id);
    this.setState({
      productsFiltered: [...results],
    });
  };

  render() {
    const { productsFiltered, categorizedProducts } = this.state;
    return (
      <div className="home-principal">
        <Header handleSearch={ this.handleSearch } />
        <main className="home-container">
          <CategoriesFilter
            handleChangeCategory={ this.handleChangeCategory }
          />
          {
            productsFiltered === undefined ? (
              <div className="home-results">
                <h1>VOCÊ AINDA NÃO REALIZOU UMA BUSCA</h1>
                <p data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              </div>
            ) : null
          }
          {
            productsFiltered && productsFiltered.length === 0 ? (
              <div className="home-results">
                <h1>Nenhum produto foi encontrado</h1>
                <p data-testid="home-initial-message">
                  Digite outro termo de pesquisa ou escolha uma categoria.
                </p>
              </div>
            ) : null
          }
          {
            productsFiltered && productsFiltered.length > 0 ? (
              <div className="home-cards">
                {
                  productsFiltered.map((product) => (
                    <ProductCard key={ product.id } data={ product } />
                  ))
                }
              </div>
            ) : null
          }
          {
            categorizedProducts > 0 && !productsFiltered ? (
              categorizedProducts.map((product) => (
                <ProductCard key={ product.id } data={ product } />
              ))
            ) : null
          }
        </main>
      </div>
    );
  }
}
