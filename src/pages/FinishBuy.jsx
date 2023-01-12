import React from 'react';
import iconVisa from '../img/icon-visa.png';
import iconMaster from '../img/icon-mastercard.png';
import iconElo from '../img/icon-elo.png';
import iconBoleto from '../img/icon-boleto.png';
import './css/FinishBuy.css';

export default class FinishBuy extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="finish-buy-container">
        <div className="review-products-container">
          <h4 className="titles-finish">Revise seus pedidos</h4>
          <div className="products-finish-container" />
          <p>Total</p>
        </div>

        <div className="form-finish-container">
          <h4 className="titles-finish">Informações do comprador</h4>
          <form className="finish-buy-form">
            <input type="text" placeholder="Nome Completo" />
            <input type="text" placeholder="CPF" />
            <input type="email" placeholder="E-mail" />
            <input type="text" placeholder="Telefone" />
            <input type="text" placeholder="CEP" />
            <input type="text" placeholder="Endereço" />
            <input type="text" placeholder="Complemento" />
            <input type="text" placeholder="Número" />
            <input type="text" placeholder="Cidade" />
            <select>
              <option value="null">Estado</option>
            </select>
          </form>
        </div>

        <div className="payment-finish-container">
          <h4>Método de pagamento</h4>
          <div>
            <p>Boleto</p>
            <input type="radio" id="boleto" name="payment-method" value="boleto" />
            <img src={ iconBoleto } alt="Ícone de Boleto" />
          </div>

          <div>
            <p>Cartão de Crédito</p>
            <label htmlFor="visa">
              <input type="radio" id="visa" name="payment-method" value="visa" />
              Visa
              <img src={ iconVisa } alt="Ícone Cartão Visa" />
            </label>

            <label htmlFor="mastercard">
              <input
                type="radio"
                id="mastercard"
                name="payment-method"
                value="mastercard"
              />
              Mastercard
              <img src={ iconMaster } alt="Ícone Mastercard"/>
            </label>

            <label htmlFor="elo">
              <input type="radio" id="elo" name="payment-method" value="elo" />
              Elo
              <img src={ iconElo } alt="Ícone Elo" />
            </label>
          </div>
          <button type="submit" className="buy-checkout">Comprar</button>
        </div>
      </div>
    );
  }
}
