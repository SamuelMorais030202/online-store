import React from 'react';
import { PropTypes as types } from 'prop-types';
import iconVisa from '../img/icon-visa.png';
import iconMaster from '../img/icon-mastercard.png';
import iconElo from '../img/icon-elo.png';
import iconBoleto from '../img/icon-boleto.png';
import Header from '../components/Header';
import CartList from '../components/CartList';
import './css/Checkout.css';

export default class Checkout extends React.Component {
  state = {
    fullname: '',
    cpf: '',
    email: '',
    tel: '',
    cep: '',
    address: '',
    complement: '',
    number: '',
    city: '',
    pay: '',
    showError: false,
  };

  validateInputs = () => {
    const {
      fullname,
      cpf,
      tel, cep, email, address, pay } = this.state;
    const arrayValidate = [fullname, cpf,
      tel, cep, email, address, pay];
    return arrayValidate.every((item) => item.length > 0);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateInputs()) {
      const { history } = this.props;
      localStorage.setItem('saveProduct', JSON.stringify([]));
      this.setState({
        showError: false,
      });
      history.push('/');
    } else {
      this.setState({
        showError: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const productList = JSON.parse(localStorage.getItem('saveProduct'));
    const total = JSON.parse(localStorage.getItem('totalBuy'));
    const {
      fullname,
      cpf,
      tel, cep, city, email, number, address, complement, showError } = this.state;
    return (
      <div className="checkout-sub-container">
        <Header />
        <h1 className="titles-finish">Revise seus pedidos</h1>
        <CartList
          data={ productList }
          showQuantity={ false }
          funcCalculate={ () => {} }
        />
        <h3>
          {`Total: R$ ${total}`}
        </h3>
        <div className="form-finish-container">
          <h4 className="titles-finish">Informações do comprador</h4>
          <form className="finish-buy-form">
            <input
              onChange={ this.handleChange }
              type="text"
              placeholder="Nome Completo"
              data-testid="checkout-fullname"
              name="fullname"
              value={ fullname }
            />
            <input
              type="text"
              onChange={ this.handleChange }
              placeholder="CPF"
              data-testid="checkout-cpf"
              name="cpf"
              value={ cpf }
            />
            <input
              type="email"
              onChange={ this.handleChange }
              placeholder="E-mail"
              data-testid="checkout-email"
              name="email"
              value={ email }
            />
            <input
              type="text"
              onChange={ this.handleChange }
              placeholder="Telefone"
              data-testid="checkout-phone"
              name="tel"
              value={ tel }
            />
            <input
              type="text"
              onChange={ this.handleChange }
              placeholder="CEP"
              data-testid="checkout-cep"
              name="cep"
              value={ cep }
            />
            <input
              type="text"
              onChange={ this.handleChange }
              placeholder="Endereço"
              data-testid="checkout-address"
              name="address"
              value={ address }
            />
            <input
              type="text"
              onChange={ this.handleChange }
              placeholder="Complemento"
              name="complement"
              value={ complement }
            />
            <input
              type="text"
              onChange={ this.handleChange }
              placeholder="Número"
              name="number"
              value={ number }
            />
            <input
              type="text"
              onChange={ this.handleChange }
              placeholder="Cidade"
              name="city"
              value={ city }
            />
            <select>
              <option value="null">Estado</option>
            </select>
          </form>

          <div className="payment-finish-container">
            <h4>Método de pagamento</h4>
            <div>
              <p>Boleto</p>
              <input
                type="radio"
                id="boleto"
                onChange={ this.handleChange }
                name="pay"
                value="boleto"
                data-testid="ticket-payment"
              />
              <img src={ iconBoleto } alt="Ícone de Boleto" />
            </div>

            <p>Cartão de Crédito</p>
            <label htmlFor="visa">
              <input
                type="radio"
                id="visa"
                onChange={ this.handleChange }
                name="pay"
                value="visa"
                data-testid="visa-payment"
              />
              Visa
              <img src={ iconVisa } alt="Ícone Cartão Visa" />
            </label>

            <label htmlFor="mastercard">
              <input
                type="radio"
                id="mastercard"
                name="pay"
                onChange={ this.handleChange }
                value="mastercard"
                data-testid="master-payment"
              />
              Mastercard
              <img src={ iconMaster } alt="Ícone Mastercard" />
            </label>

            <label htmlFor="elo">
              <input
                type="radio"
                id="elo"
                name="pay"
                onChange={ this.handleChange }
                value="elo"
                data-testid="elo-payment"
              />
              Elo
              <img src={ iconElo } alt="Ícone Elo" />
            </label>

            <button
              type="button"
              className="buy-checkout"
              onClick={ this.handleSubmit }
              data-testid="checkout-btn"
            >
              Comprar
            </button>
            {
              showError
                ? <p data-testid="error-msg">Campos inválidos</p>
                : null
            }
          </div>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: types.shape(
    {
      push: types.func.isRequired,
    },
  ).isRequired,
};
