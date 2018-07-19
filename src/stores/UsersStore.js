import { observable, action, computed } from 'mobx';
import _ from 'lodash';
import { createTransformer } from 'mobx-utils/lib/mobx-utils';

class UsersStore {
  constructor(rootStore) {
    this.root = rootStore;
  }

  @observable users = [];

  @action setUsers = users => (this.users = users);

  @computed get byIds() {
    return createTransformer(ids => _.filter(this.users, user => _.includes(ids, user.id)));
  }

  @computed get byId() {
    return createTransformer(id => {
      const user = _.find(this.users, user => String(user.id) === String(id));

      if (!user) {
        return null;
      }

      const books = this.root.booksStore.byUserId(user.id);

      return { ...user, books };
    });
  }
}

export default UsersStore;
