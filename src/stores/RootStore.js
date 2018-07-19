import { observable, action } from 'mobx';
import uuid from 'uuid/v4';
import _ from 'lodash';
import BooksStore from './BooksStore';
import UsersStore from './UsersStore';
import NotificationsStore from './NotificationsStore';

const extractUsers = data => _.chain(data.books)
  .map('users')
  .flatten()
  .uniqBy('id')
  .value();

const extractBooks = data => data.books.map(book => ({
  title: book.title,
  author: book.author,
  isbn: book.metadata.slice(1, 18),
  category: book.metadata.slice(18, 30).trim(),
  users: book.users.map(user => user.id),
  published: new Date(book.metadata.slice(-15) * 1000), // JS works with milis
  uuid: uuid(),
}));

class RootStore {
  @observable loading = true;
  @observable bookStore;
  @observable userStore;

  constructor(api) {
    this.api = api;
    this.booksStore = new BooksStore(this);
    this.usersStore = new UsersStore(this);
    this.notificationsStore = new NotificationsStore(this);

    this.api.getInitialData().then(data => {
      this.storeData(data);
      this.finishedLoading();
    });
  }

  @action finishedLoading = _ => (this.loading = false);

  @action storeData = data => {
    this.usersStore.setUsers(extractUsers(data));
    this.booksStore.setBooks(extractBooks(data));
  };

  notify = (msg, level = 'success', options = {}) => {
    this.notificationsStore.addNotification({ msg, level, options});
  };
}

export default RootStore;
