import React, { Component } from 'react';
import _ from 'lodash';
import { observer, inject } from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 3000,
};

@inject('rootStore')
@observer
class Notifications extends Component {
  componentWillUpdate(nextProps) {
    const { notifications } = this.props.rootStore.notificationsStore;
    _.each(notifications, (notification) => {
      this.notify(notification);
    });
  }

  notify(notification) {
    const { dispatchNotification, removeNotification } = this.props.rootStore.notificationsStore;
    toast(
      notification.msg,
      {
        type: notification.level,
        ...defaultOptions,
        ...notification.options,
        onClose: () =>  removeNotification(notification.uuid)
      }
    );
    dispatchNotification(notification.uuid);
  }

  render() {
    /*
    * We declare notifications so mobx will notify with changes and we can react in component will update
    * */
    const { notifications } = this.props.rootStore.notificationsStore; // eslint-disable-line no-unused-vars
    return <ToastContainer/>;
  }
}

export default Notifications;