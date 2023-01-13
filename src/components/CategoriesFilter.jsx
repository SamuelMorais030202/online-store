import PropTypes from 'prop-types';
import React from 'react';
import { getCategories } from '../services/api';
import './css/CategoriesFilter.css';

export default class CategoriesFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    this.setState({
      categories: await getCategories(),
    });
  }

  render() {
    const { categories } = this.state;
    const { handleChangeCategory } = this.props;
    return (
      <div className="container-item-categories">
        <h1>Categorias</h1>
        <hr />
        {categories.map((item) => (
          <div key={ item.id } className="category-item">
            <label
              data-testid="category"
              htmlFor={ item.id }
              className="category-tile"
            >
              <input
                type="radio"
                name="categories-filter"
                value={ item.name }
                id={ item.id }
                onChange={ () => {
                  handleChangeCategory(item.id);
                } }
              />
              {item.name}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

CategoriesFilter.propTypes = {
  handleChangeCategory: PropTypes.func.isRequired,
};
