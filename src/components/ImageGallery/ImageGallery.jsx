// import React, { Component } from 'react';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import api from 'helpers/api';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Notification from 'components/Notification/Notification';

const ImageGallery = ({ imgName }) => {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalImg, setTotalImg] = useState(null);
  const [targetImg, setTargetImg] = useState('');

  const imgNameRef = useRef(imgName);

  useEffect(() => {
    const isNewSearch = imgName !== imgNameRef.current;

    if (!imgName || (!isNewSearch && page === 1)) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const currentPage = isNewSearch ? 1 : page;
        const data = await api(imgName, currentPage);

        if (isNewSearch) {
          setPage(1);
          imgNameRef.current = imgName;
        }

        setTotalImg(data.total);

        setImg(prevImg => {
          const images = isNewSearch ? [] : prevImg;
          return [...images, ...data.hits];
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [imgName, page]);

  const getPageOnLoadMoreBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      {loading && <Loader />}
      {img && (
        <ul className={s.ImageGallery}>
          {img.map(el => (
            <ImageGalleryItem
              key={el.id}
              url={el.webformatURL}
              tags={el.tags}
              largeImage={el.largeImageURL}
              getLargeImage={setTargetImg}
            />
          ))}
        </ul>
      )}
      {img?.length === 0 && <Notification />}
      {12 * page <= totalImg && (
        <Button onBtnClick={getPageOnLoadMoreBtnClick} page={page} />
      )}
      {targetImg && <Modal targetPhoto={targetImg} closeModal={setTargetImg} />}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  imgName: PropTypes.string.isRequired,
};
