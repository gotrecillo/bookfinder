import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { withStyles } from '../ui/styles';
import List from '../ui/List';
import Typography from '../ui/Typography';
import LinkedListItem from '../ui/LinkedListItem';

const styles = theme => ({
  wrap: {
    marginTop: '2em',
  },
});

class BookViewers extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })),
  };

  render() {
    const { classes, users } = this.props;

    return (
      <div className={classNames(classes.wrap)}>
        {
          _.isEmpty(users)
            ? <Typography variant="subheading">El libro todavia no ha sido consultado por nadie </Typography>
            : <Fragment><Typography color="primary" variant="subheading">Consultado por: </Typography>
              <List>
                {users.map(user => <LinkedListItem to={`/users/${user.id}`} label={user.name} key={user.id}/>)
                }
              </List>
            </Fragment>
        }
      </div>
    );
  }
}

export default withStyles(styles)(BookViewers);
