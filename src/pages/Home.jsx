import React, { Component } from 'react';
import CategoriesFilter from '../components/CategoriesFilter';
import Header from '../components/Header';
import './css/Home.css';
import {
  getProductsFromCategoryAndQuery,
  getProductByCategory,
} from '../services/api';
import ProductCard from '../components/ProductCard';

// const MAX_REQ_API = 20;

export default class Home extends Component {
  state = {
    categorySelected: '',
    productsFiltered: undefined,
    cartQuantity: 0,
  };

  componentDidMount() {
    const saveProduct = localStorage.getItem('saveProduct');
    const arrayProduct = saveProduct ? JSON.parse(saveProduct) : [];
    this.setState({
      cartQuantity: arrayProduct.reduce((a, c) => a + c.quantity, 0),
    });
  }

  handleSearch = async (textSearch) => {
    const { categorySelected } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(
      categorySelected,
      textSearch,
    );
    this.setState({
      productsFiltered: [...results],
    });
  };

  handleChangeCategory = async (categoryId) => {
    this.setState({
      categorySelected: categoryId,
    });
    const { results } = await getProductByCategory(categoryId);
    console.log(results);
    this.setState({
      productsFiltered: [...results],
    });
  };

  addProdToCart = (product) => {
    const {
      title, thumbnail, price, id, availableQuantity,
    } = product;
    const saveProduct = localStorage.getItem('saveProduct');
    const arrayProduct = saveProduct ? JSON.parse(saveProduct) : [];
    const productFiltered = arrayProduct.find((prod) => prod.id === id);
    if (arrayProduct.length === 0 || !productFiltered) {
      arrayProduct.push({ title, thumbnail, price, id, quantity: 1, availableQuantity });
    } else {
      productFiltered.quantity = (
        availableQuantity > productFiltered.quantity) ? (
          productFiltered.quantity + 1
        ) : productFiltered.quantity;
    }
    this.setState({
      cartQuantity: arrayProduct.reduce((a, c) => a + c.quantity, 0),
    });
    localStorage.setItem('saveProduct', JSON.stringify(arrayProduct));
  };

  render() {
    const { productsFiltered, categorizedProducts, cartQuantity } = this.state;
    return (
      <div className="home-principal">
        <Header handleSearch={ this.handleSearch } cartQuantity={ cartQuantity } />
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
                    <ProductCard
                      key={ product.id }
                      data={ product }
                      saveLocalStorage={ this.addProdToCart }
                    />
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
