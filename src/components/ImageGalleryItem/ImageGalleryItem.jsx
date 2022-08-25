import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url, tags, largeImage, getLargeImage }) => {
  const handleClick = ({ target }) => {
    getLargeImage(target.dataset.url);
  };
  return (
    <li className={s.ImageGalleryItem}>
      <img
        onClick={handleClick}
        className={s.ImageGalleryItemImage}
        data-url={largeImage}
        src={url}
        alt={tags}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  getLargeImage: PropTypes.func.isRequired,
  tags: PropTypes.string,
};
