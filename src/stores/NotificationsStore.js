import _ from 'lodash';
import uuid from 'uuid/v4';
import { observable, action, computed } from 'mobx';

class NotificationsStore {
  constructor(rootStore) {
    this.root = rootStore;
  }

  @observable _notifications = [];

  @action addNotification = (notification) => {
    this._notifications.push({
      ...notification,
      uuid: uuid(),
      dispatched: false,
    });
  };

  @action dispatchNotification  = uuid => {
    this._notifications = this._notifications.map(notification =>
      notification.uuid === uuid
        ? { ...notification, dispatched: true }
        : notification,
    );
  };

  @action removeNotification = uuid => {
    this._notifications = _.reject(this._notifications, { uuid });
  };

  @computed get notifications() {
    return _.filter(this._notifications, { dispatched: false });
  }
}

export default NotificationsStore;
