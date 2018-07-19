import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import Books from '../components/Books/Books';
import Spinner from '../components/ui/Spinner';
import BookSearcher from '../components/Books/BookSearcher';
import BookCreateButton from '../components/Books/BookCreateButton';

@inject('rootStore')
@observer
class Home extends Component {
  static propTypes = {
    rootStore: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      booksStore: PropTypes.shape({
        books: MobxPropTypes.observableArray.isRequired,
        deleteBook: PropTypes.func.isRequired,
      }),
    }),
  };

  render() {
    const { rootStore } = this.props;
    const { loading, booksStore: { books, deleteBook, filter, setFilter } } = rootStore;

    if (loading) {
      return <Spinner/>;
    }

    return (
      <div>
        <BookSearcher filter={filter} setFilter={setFilter}/>
        <BookCreateButton/>
        <Books books={books} deleteBook={deleteBook}/>
      </div>
    );
  }
}

export default Home;
