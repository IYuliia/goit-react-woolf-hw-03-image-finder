import { Component } from 'react';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <div className={styles.searchFormContainer}>
        <header>
          <form className={styles.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={styles.searchFormButton}>
              <span className="button-label">Search</span>
            </button>

            <input
              className={styles.searchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </form>
        </header>
      </div>
    );
  }
}

export default Searchbar;
