import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { getAllImagesApi } from '../api/imageGallery';

class App extends Component {
  state = {
    modalImageUrl: '',
    isModalOpen: false,
    isLoading: false,
    images: [],
    currentPage: 1,
    query: '',
  };

  handleImageClick = imageUrl => {
    this.setState({ modalImageUrl: imageUrl, isModalOpen: true });
  };

  handleLoadMore = async () => {
    const { currentPage, images, query } = this.state;
    const nextPage = currentPage + 1;
    try {
      this.setState({ isLoading: true });
      const data = await getAllImagesApi(query, nextPage);
      this.setState({
        images: [...images, ...data.hits],
        currentPage: nextPage,
      });
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = async query => {
    this.setState({
      query: query,
      images: [],
      currentPage: 1,
    });

    try {
      const data = await getAllImagesApi(query);
      this.setState({ images: data.hits });
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  render() {
    const { modalImageUrl, isModalOpen, isLoading, images } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && <Button onLoadMore={this.handleLoadMore} />}
        {isModalOpen && (
          <Modal
            imageUrl={modalImageUrl}
            onClose={() => this.setState({ isModalOpen: false })}
          />
        )}
      </div>
    );
  }
}

export default App;
