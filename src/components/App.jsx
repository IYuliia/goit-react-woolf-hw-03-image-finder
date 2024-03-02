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
    hasMoreImages: true,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      try {
        const { query, currentPage } = this.state;
        const data = await getAllImagesApi(query, currentPage);
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          hasMoreImages: data.hits.length === 12,
        }));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }
  }

  handleImageClick = imageUrl => {
    this.setState({ modalImageUrl: imageUrl, isModalOpen: true });
  };

  handleLoadMore = () => {
    const { hasMoreImages } = this.state;
    if (!hasMoreImages) return;

    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleSearchSubmit = query => {
    this.setState({
      query: query,
      images: [],
      currentPage: 1,
      hasMoreImages: false,
    });
  };

  render() {
    const { modalImageUrl, isModalOpen, isLoading, images, hasMoreImages } =
      this.state;
    const shouldLoadMore = images.length >= 12 && hasMoreImages;
    return (
      <div
        style={{
          height: '100vh',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {shouldLoadMore && (
          <Button onClick={this.handleLoadMore} query={this.state.query} />
        )}
        {isModalOpen && (
          <Modal
            imageUrl={modalImageUrl}
            isOpen={isModalOpen}
            onClose={() => this.setState({ isModalOpen: false })}
          />
        )}
      </div>
    );
  }
}

export default App;
