import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './Gallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={styles.gallery}>
      {images &&
        images.map(image => (
          <ImageGalleryItem
            key={image.id}
            imageUrl={image.webformatURL}
            alt={image.alt}
          />
        ))}
    </ul>
  );
};

export default ImageGallery;
