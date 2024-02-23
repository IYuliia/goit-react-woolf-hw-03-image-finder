import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <ul className="gallery">
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
