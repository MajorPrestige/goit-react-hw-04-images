import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

const Searchbar = ({ setImgName, imgName }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchImgName = form.elements.search.value.trim().toLowerCase();
    if (searchImgName === '') {
      return toast.error('Please enter the name of photo');
    }

    if (searchImgName === imgName) {
      return toast.warn(
        `You have already received pictures for this request. Please enter a new request.`
      );
    }

    setImgName(searchImgName);
    form.reset();
  };

  return (
    <>
      <header className={s.Searchbar}>
        <form onSubmit={handleSubmit} className={s.SearchForm}>
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
};

export default Searchbar;

Searchbar.propTypes = {
  setImgName: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
};
