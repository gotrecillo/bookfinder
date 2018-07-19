import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '../ui/styles';
import Book from './Book';
import BooksEmptyList from './BooksEmptyList';

const styles = theme => ({
  books: {
    padding: '1.5em',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

@observer
class Books extends Component {
  static propTypes = {
    books: MobxPropTypes.arrayOrObservableArray.isRequired,
    deleteBook: PropTypes.func.isRequired,
    classNames: PropTypes.object,
  };

  render() {
    const { books, classes, deleteBook } = this.props;

    if (!books.length) {
      return <BooksEmptyList/>;
    }

    return (
      <div className={classNames(classes.books)}>
        {books.map(book => <Book key={book.isbn} book={book} deleteBook={deleteBook}/>)}
      </div>
    );
  }
}

export default withStyles(styles)(Books);
