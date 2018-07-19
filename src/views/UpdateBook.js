import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookFormUI from '../components/Books/BookFormUI';
import makeBookForm from '../forms/book';
import Spinner from "../components/ui/Spinner";

@inject('rootStore')
@observer
class UpdateBook extends Component {
  static propTypes = {
    rootStore: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      booksStore: PropTypes.shape({
        updateBook: PropTypes.func.isRequired,
        bookByUuid: PropTypes.func.isRequired,
      }),
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    })
  };

  render() {
    const { rootStore: { booksStore, loading }, match } = this.props;

    const uuid = match.params.id;

    if (loading) {
      return <Spinner />;
    }

    const book = booksStore.bookByUuid(uuid);

    if (!book) {
      return <Redirect to="/" />
    }

    const form = makeBookForm(book);

    return (
      <BookFormUI
        form={form}
        title="Actualizar libro"
        action="update"
        onSubmit={booksStore.updateBook(uuid)}
        redirect="/"
      />
    );
  }
}

export default UpdateBook;
