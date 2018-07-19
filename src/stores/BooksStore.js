import _ from 'lodash';
import uuid from 'uuid/v4';
import { observable, action, computed } from 'mobx';
import { createTransformer } from 'mobx-utils';

class BooksStore {
  constructor(rootStore) {
    this.root = rootStore;
  }

  @observable _books = [];
  @observable _filter = { title: '', author: '', isbn: '', category: '' };

  @action setBooks = books => this._books = books;

  @action addBook = book => {
    this.root.notify(`El libro: "${book.title}" ha sido añadido`);

    this._books.push({ ...book, uuid: uuid(), users: [] });
  };

  @action updateBook = (uuid) => updatedBook => {
    this.root.notify(`El libro: "${updatedBook.title}" ha sido actualizado`);

    this._books = this._books.map(book =>
      book.uuid === uuid
        ? { ...updatedBook, uuid }
        : book,
    );
  };

  @action deleteBook = uuid => {
    const book = _.find(this._books, { uuid });
    this._books = _.reject(this._books, { uuid });
    this.root.notify(`El libro: "${book.title}" ha sido borrado`);
  };

  @action setFilter = filter => this._filter = filter;

  @computed get bookByUuid() {
    return createTransformer(uuid => {
      const book = _.find(this._books, { uuid });

      if (!book) {
        return null;
      }

      const users = this.root.usersStore.byIds(book.users);

      return { ...book, users };
    });
  }

  @computed get filter() {
    const { title, author, isbn, category } = this._filter;

    return {
      title: {
        value: title,
        disabled: Boolean(author || isbn || category),
      },
      author: {
        value: author,
        disabled: Boolean(title || isbn),
      },
      isbn: {
        value: isbn,
        disabled: Boolean(title || author || category),
      },
      category: {
        value: category,
        disabled: Boolean(title || isbn),
      },
    };
  }

  @computed get books() {
    const activeFilter = _.pickBy(this._filter);

    if (_.isEmpty(activeFilter)) {
      return this._books;
    }

    return _.filter(this._books, (book) => {
      return _.every(activeFilter, (value, key) => book[key].toLowerCase().indexOf(value.toLowerCase()) !== -1);
    });
  }

  @computed get byUserId() {
    return createTransformer(id => {
      return this._books.filter(book => _.includes(book.users, id));
    });
  }
}

export default BooksStore;
