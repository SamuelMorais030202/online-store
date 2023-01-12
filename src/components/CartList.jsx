import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './css/CartList.css';
import deleteImage from '../img/deletar.png';

export default class CartList extends Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      productList: data,
      total: 0,
    };
  }

  componentDidMount() {
    this.calculateTotal();
  }

  updateQuantity = (value, id) => {
    const savedProducts = JSON.parse(localStorage.getItem('saveProduct'));
    const prod = savedProducts.find((product) => product.id === id);
    if (value) {
      prod.quantity += 1;
    } else if (prod.quantity > 1) {
      prod.quantity -= 1;
    }
    localStorage.setItem('saveProduct', JSON.stringify(savedProducts));
    this.setState({
      productList: savedProducts,
    }, () => {
      this.calculateTotal();
    });
  };

  deleteProduct = (id) => {
    const savedProducts = JSON.parse(localStorage.getItem('saveProduct'));
    const newProducts = savedProducts.filter((product) => product.id !== id);
    localStorage.setItem('saveProduct', JSON.stringify(newProducts));
    this.setState({
      productList: newProducts,
    }, () => {
      this.calculateTotal();
    });
  };

  calculateTotal = () => {
    const { productList } = this.state;
    let currentTotal = 0;

    productList.forEach((product) => {
      currentTotal += product.quantity * product.price;
      console.log(currentTotal);
    })

    this.setState({
      total: (currentTotal).toFixed(2)
    })
  }

  render() {
    const { productList, total } = this.state;
    return (
      <>
        <div className="cart-list">
          <h1>Carrinho de Compras</h1>
          {
            productList.map(({ id, title, price, thumbnail, quantity }, index) => (
              <div key={ `cart-${id}-${index}` } className="cart-tile">
                <button
                  type="button"
                  className="button-delete"
                  data-testid="remove-product"
                  onClick={ () => { this.deleteProduct(id);  } }
                >
                  <img src={ deleteImage } alt="" />
                </button>
                <img src={ thumbnail } alt="Produto Imagem" />
                <p
                  data-testid="shopping-cart-product-name"
                  className="title-product-saved"
                >
                  { title }
                </p>
                <div
                  className="container-quantity"
                >
                  <button
                    type="button"
                    className="button-quantity"
                    data-testid="product-decrease-quantity"
                    onClick={ () => {
                      this.updateQuantity(false, id);
                    } }
                  >
                    -
                  </button>
                  <p
                    className="quantity-product-saved"
                    data-testid="shopping-cart-product-quantity"
                  >
                    { quantity }
                  </p>
                  <button
                    type="button"
                    className="button-quantity"
                    data-testid="product-increase-quantity"
                    onClick={ () => {
                      this.updateQuantity(true, id);
                    } }
                  >
                    +
                  </button>
                </div>
                <p className="price-product-saved">
                  R$
                  { ((Math.round(price * 100) / 100).toFixed(2)).replace('.', ',') }
                </p>
              </div>
            ))
          }
        </div>

        <div>
          <div className="cart-total">
            <p>
              Total: {total}
            </p>
          </div>
        </div>
      </>
    );
  }
}

CartList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
