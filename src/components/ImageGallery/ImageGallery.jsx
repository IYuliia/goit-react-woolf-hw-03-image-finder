import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';

const ImageGallery = () => {
  return (
    <div>
      <ul className="gallery">
        <ImageGalleryItem />
      </ul>
    </div>
  );
};

export default ImageGallery;
