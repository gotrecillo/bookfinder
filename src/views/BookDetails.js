import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../components/ui/Spinner';
import BookExtended from '../components/Books/BookExtended';

@inject('rootStore')
@observer
class BookDetails extends Component {
  static propTypes = {
    rootStore: PropTypes.shape({
      booksStore: PropTypes.shape({
        deleteBook: PropTypes.func.isRequired,
        bookByUuid: PropTypes.func.isRequired,
      }),
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
  };

  render() {
    const { rootStore: { booksStore, loading }, match } = this.props;

    const uuid = match.params.id;

    if (loading) {
      return <Spinner/>;
    }

    const book = booksStore.bookByUuid(uuid);

    if (!book) {
      return <Redirect to="/"/>;
    }

    return (
      <BookExtended book={book} deleteBook={booksStore.deleteBook}/>
    );
  }
}

export default BookDetails;
