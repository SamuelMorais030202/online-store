import React, { Component } from 'react';
import CategoriesFilter from '../components/CategoriesFilter';
import Header from '../components/Header';
import './css/Home.css';
import {
  getProductsFromCategoryAndQuery,
  getProductByCategory,
  getProductsDetailsById,
} from '../services/api';
import ProductCard from '../components/ProductCard';

const MAX_REQ_API = 20;

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

  compare = (a, b) => {
    const numMin = -1;
    if (a.title < b.title) {
      return numMin;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  };

  searchProductDetail = async (results) => {
    const arrayPromises = [];
    for (let index = 0; index < (results.length / MAX_REQ_API); index += 1) {
      const promise = new Promise((resolve, reject) => {
        const min = index * MAX_REQ_API;
        const max = MAX_REQ_API + (MAX_REQ_API * index);
        const arrayProd = results
          .map((e) => e.id).slice(min, max);
        getProductsDetailsById(arrayProd)
          .then((value) => resolve(value))
          .catch((error) => reject(Error(error.message)));
      });
      arrayPromises.push(promise);
    }
    const response = await Promise.all(arrayPromises);
    const productsFiltered = [
      ...response[0],
      ...response[1],
      ...response[2],
    ].map((e) => e.body);
    productsFiltered.sort(this.compare);
    return productsFiltered;
  };

  handleSearch = async (textSearch) => {
    const { categorySelected } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(
      categorySelected,
      textSearch,
    );
    const productsFiltered = await this.searchProductDetail(results);
    this.setState({
      productsFiltered,
    });
  };

  handleChangeCategory = async (categoryId) => {
    this.setState({
      categorySelected: categoryId,
    });
    const { results } = await getProductByCategory(categoryId);
    const productsFiltered = await this.searchProductDetail(results);
    this.setState({
      productsFiltered,
    });
  };

  addProdToCart = (product) => {
    const { title, pictures, price, id } = product;
    const saveProduct = localStorage.getItem('saveProduct');
    const arrayProduct = saveProduct ? JSON.parse(saveProduct) : [];
    const productFiltered = arrayProduct.find((prod) => prod.id === id);
    if (arrayProduct.length === 0 || !productFiltered) {
      arrayProduct.push({ title, thumbnail: pictures[0].url, price, id, quantity: 1 });
    } else {
      productFiltered.quantity += 1;
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
