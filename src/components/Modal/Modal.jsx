import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from '../css/styles.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  // Вешает слушатели (mount)
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Убирает слушатети (unmount)
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // Наблюдает на Escape и закрывает модалку
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  // Наблюдает за бекдропом и закрывает модалку
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.defaultProps = {
  children: null,
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
