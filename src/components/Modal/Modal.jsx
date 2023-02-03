import { useEffect } from 'react';
import PropTypes from 'prop-types';
import  css  from './Modal.module.css';

export const Modal = ({largeImageURL, tags, closeModal}) => {

  useEffect(() => {
    window.addEventListener('keydown', onEscPressClose);
    return () => {
      window.removeEventListener('keydown', onEscPressClose);
    }
  });

  const onEscPressClose = event => {
    if (event.code === 'Escape') {
      closeModal();
    };
  };

  const onClickClose = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };
    


  return (
    <div className={css.overlay} onClick={onClickClose}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};