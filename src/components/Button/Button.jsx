import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      className={styles.loadMore}
      onClick={onClick}
      disabled={disabled}
    >
      Load more
    </button>
  );
};

export default Button;
