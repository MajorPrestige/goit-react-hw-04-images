import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    getSearchQuery: PropTypes.func,
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.search.value.trim().toLowerCase();
    if (searchQuery === '') {
      return toast.error('Please enter the name of photo');
    }

    if (searchQuery === this.props.searchQuery) {
      return toast.warn(
        `You have already received pictures for this request. Please enter a new request.`
      );
    }

    this.props.getSearchQuery(searchQuery);
    form.reset();
  };

  render() {
    return (
      <>
        <header className={s.Searchbar}>
          <form onSubmit={this.handleSubmit} className={s.SearchForm}>
            <button type="submit" className={s.SearchFormButton}>
              <span className={s.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              name="search"
              className={s.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;
