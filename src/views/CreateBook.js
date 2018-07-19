import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import BookFormUI from '../components/Books/BookFormUI';
import makeBookForm from '../forms/book';

@inject('rootStore')
@observer
class CreateBook extends Component {
  static propTypes = {
    rootStore: PropTypes.shape({
      booksStore: PropTypes.shape({
        addBook: PropTypes.func.isRequired,
      }),
    }),
  };

  render() {
    const { rootStore: { booksStore: { addBook } } } = this.props;
    const form = makeBookForm();

    return (
      <BookFormUI
        form={form}
        title="Añadir libro"
        action="create"
        onSubmit={addBook}
        redirect="/"
      />
    );
  }
}

export default CreateBook;
