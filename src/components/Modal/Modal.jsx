import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ targetPhoto, closeModal }) => {
  useEffect(() => {
    const onEscPush = e => {
      if (e.code !== 'Escape') {
        return;
      }
      closeModal(false);
    };

    window.addEventListener('keydown', onEscPush);

    return () => {
      window.removeEventListener('keydown', onEscPush);
    };
  }, [closeModal]);

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal(false);
    }
  };

  return createPortal(
    <div onClick={onOverlayClick} className={s.overlay}>
      <div className={s.modal}>
        <img src={targetPhoto} alt="large target img" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  targetPhoto: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
