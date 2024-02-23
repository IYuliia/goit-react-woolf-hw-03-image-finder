import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageUrl, alt }) => {
  return (
    <li className={styles.photoCard}>
      <img className={styles.photoCardImage} src={imageUrl} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;
