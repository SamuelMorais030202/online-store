import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ratingImgFalse from '../img/rating-false.png';
import ratingImgTrue from '../img/rating-true.png';
import './css/RatingForm.css';

const MAX_RATINGS = 5;

export default class RatingForm extends Component {
  RATINGS = [];

  constructor() {
    super();
    for (let index = 0; index < MAX_RATINGS; index += 1) {
      this.RATINGS.push(index);
    }
  }

  state = {
    rating: 0,
    ratingInvalid: false,
    email: '',
    message: '',
    rates: [],
  };

  componentDidMount() {
    const { id } = this.props;
    const sRates = localStorage.getItem(id);
    const rates = sRates ? JSON.parse(sRates) : [];
    this.setState({
      rates,
    });
  }

  handleRate = (value) => {
    this.setState({
      rating: value + 1,
    });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { rating, email, message } = this.state;
    const { id } = this.props;
    if (rating === 0 || email.length === 0) {
      this.setState({
        ratingInvalid: true,
      });
    } else {
      const sRates = localStorage.getItem(id);
      const rates = sRates ? JSON.parse(sRates) : [];
      rates.push({
        rating: rating.toString(),
        email,
        text: message,
      });
      this.setState({
        ratingInvalid: false,
        rating: 0,
        email: '',
        message: '',
        rates,
      });
      localStorage.setItem(id, JSON.stringify(rates));
    }
  };

  render() {
    const { rating, ratingInvalid, email, message, rates } = this.state;
    return (
      <div className="rating-form">
        <form>
          <h1>Avaliações</h1>
          <div className="row">
            <input
              type="email"
              placeholder="Email"
              data-testid="product-detail-email"
              className="input-email-rating"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            {
              this.RATINGS.map((value) => (
                <button
                  type="button"
                  key={ `rating-value-${value}` }
                  className="rating-button"
                  data-testid={ `${value + 1}-rating` }
                  onClick={ () => { this.handleRate(value); } }
                >
                  <img
                    src={ rating > value ? ratingImgTrue : ratingImgFalse }
                    alt="Avaliação"
                  />
                </button>
              ))
            }
          </div>
          <textarea
            data-testid="product-detail-evaluation"
            id=""
            cols="30"
            rows="10"
            placeholder="Mensagem (opcional)"
            className="input-text-rating"
            name="message"
            value={ message }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.handleSubmit }
          >
            Avaliar
          </button>
          {
            ratingInvalid ? (
              <p data-testid="error-msg">Campos inválidos</p>
            ) : null
          }
        </form>
        <div className="ratings">
          {
            rates.map((rate, index) => (
              <div
                key={ `rating-list-${index}` }
                className="rating-card"
              >
                <div className="row">
                  <h1
                    data-testid="review-card-email"
                    className="rating-card-email"
                  >
                    { rate.email }
                  </h1>
                  <div
                    data-testid="review-card-rating"
                  >
                    {
                      this.RATINGS.map((value) => (
                        <img
                          key={ `rated-value-${value}` }
                          src={
                            value.toString() >= rate.rating ? (
                              ratingImgFalse
                            ) : ratingImgTrue
                          }
                          alt="Rating"
                        />
                      ))
                    }
                  </div>
                </div>
                <p data-testid="review-card-evaluation">{ rate.text }</p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

RatingForm.propTypes = {
  id: PropTypes.string.isRequired,
};
