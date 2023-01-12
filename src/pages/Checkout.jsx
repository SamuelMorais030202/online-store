import React from 'react';
import iconVisa from '../img/icon-visa.png';
import iconMaster from '../img/icon-mastercard.png';
import iconElo from '../img/icon-elo.png';
import iconBoleto from '../img/icon-boleto.png';
import Header from '../components/Header';
import CartList from "../components/CartList";
import { PropTypes as types } from 'prop-types';
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
    uf: '',
    pay: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    localStorage.setItem('saveProduct', JSON.stringify([]))
    history.push("/");
  }

  handleChange = ({ target }) => {

  }

  render() {
    const productList = JSON.parse(localStorage.getItem('saveProduct'));
    const total = JSON.parse(localStorage.getItem('totalBuy'));
    return (
      <div className="checkout-sub-container">
        <Header />
        <h1 className="titles-finish">Revise seus pedidos</h1>
        <CartList data={ productList }  showQuantity={ false }funcCalculate={() => {}} />
        <h3>
          {`Total: R$ ${total}`}
        </h3>
        <div className="form-finish-container">
          <h4 className="titles-finish">Informações do comprador</h4>
          <form className="finish-buy-form">
            <input
              onChange={ this.handleSubmit }
              type="text"
              placeholder="Nome Completo"
              data-testid="checkout-fullname"
              name="fullname"
            />
            <input
              type="text"
              placeholder="CPF"
              data-testid="checkout-cpf"
              name="cpf"
            />
            <input
              type="email"
              placeholder="E-mail"
              data-testid="checkout-email"
              name="email"
            />
            <input
              type="text"
              placeholder="Telefone"
              data-testid="checkout-phone"
              name="tel"
            />
            <input
              type="text"
              placeholder="CEP"
              data-testid="checkout-cep"
              name="cep"
            />
            <input
              type="text"
              placeholder="Endereço"
              data-testid="checkout-address"
              name="address"
            />
            <input
              type="text"
              placeholder="Complemento"
              name="complement"
            />
            <input
              type="text"
              placeholder="Número"
              name="number"
            />
            <input
              type="text"
              placeholder="Cidade"
              name="city"
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
                name="payment-method"
                value="boleto"
                data-testid="ticket-payment"
              />
              <img src={ iconBoleto } alt="Ícone de Boleto" />
            </div>

            <div>
              <p>Cartão de Crédito</p>
              <label htmlFor="visa">
                <input
                  type="radio"
                  id="visa"
                  name="payment-method"
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
                  name="payment-method"
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
                  name="payment-method"
                  value="elo"
                  data-testid="elo-payment"
                />
                Elo
                <img src={ iconElo } alt="Ícone Elo" />
              </label>
            </div>
            <button type="button" className="buy-checkout" onClick={ this.handleSubmit } data-testid="checkout-btn">Comprar</button>
          </div>
        </div>
      </div>
    );
  }
}

Checkout.types = {
  history: types.shape().isRequired,
}
