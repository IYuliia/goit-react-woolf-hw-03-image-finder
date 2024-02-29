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
    const { query: prevQuery } = prevState;
    const { query } = this.state;

    if (query !== prevQuery) {
      await this.handleSearchSubmit(query);
    }
  }

  handleImageClick = imageUrl => {
    this.setState({ modalImageUrl: imageUrl, isModalOpen: true });
  };

  handleLoadMore = async () => {
    const { currentPage, query, hasMoreImages } = this.state;
    if (!hasMoreImages) return;

    const nextPage = currentPage + 1;
    try {
      this.setState({ isLoading: true });
      const data = await getAllImagesApi(query, nextPage);
      if (data.hits.length < 12) {
        this.setState({
          images: [...this.state.images, ...data.hits],
          hasMoreImages: false,
        });
      } else {
        this.setState({
          images: [...this.state.images, ...data.hits],
          currentPage: nextPage,
        });
      }
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
      hasMoreImages: true,
    });

    try {
      const data = await getAllImagesApi(query);
      this.setState({ images: data.hits });
    } catch (error) {
      console.error('Error fetching images:', error);
    }
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
