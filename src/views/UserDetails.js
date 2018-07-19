import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../components/ui/Spinner';
import User from '../components/users/User';

@inject('rootStore')
@observer
class BookDetails extends Component {
  static propTypes = {
    rootStore: PropTypes.shape({
      usersStore: PropTypes.shape({
        byId: PropTypes.func.isRequired,
      }),
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
  };

  render() {
    const {
      rootStore: { usersStore, loading },
      match: { params: { id } },
    } = this.props;


    if (loading) {
      return <Spinner/>;
    }

    const user = usersStore.byId(id);

    if (!user) {
      return <Redirect to="/"/>;
    }

    return (
      <User user={user} />
    );
  }
}

export default BookDetails;
