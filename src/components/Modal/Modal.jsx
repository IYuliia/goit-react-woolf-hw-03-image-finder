import { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickOutside = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { isOpen, imageUrl } = this.props;

    return (
      <div
        className={`overlay ${isOpen ? 'open' : ''}`}
        onClick={this.handleClickOutside}
      >
        <div className="modal">
          <img src={imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
