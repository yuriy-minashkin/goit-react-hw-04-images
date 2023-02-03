import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({onSearchSubmit}) => {
  
  const [query, setQuery] = useState('');

  const handleInput = event => {
    const inputValue = event.target.value.toLowerCase();
    setQuery(inputValue);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      alert('Please, type something...');
      return;
    };
    onSearchSubmit(query)
    setQuery('');
  };

  return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            name="query"
            value={query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInput}
          />
        </form>
      </header>
    );
}

Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
}