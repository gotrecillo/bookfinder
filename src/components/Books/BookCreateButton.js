import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UnstyledLink from '../ui/UnstyledLink';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { withStyles } from '../ui/styles';

const styles = theme => ({
  wrap: {
    padding: `${theme.simpleGutter}`,
  },
  icon: {
    fontSize: '16px',
    marginRight: `${theme.simpleGutter}`,
  },
});

class BookCreateButton extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.wrap)}>
        <UnstyledLink to="/books/create">
          <Button variant="raised" color="primary">
            <Icon className={classNames(classes.icon, "fa fa-book")}/>Añadir libro
          </Button>
        </UnstyledLink>
      </div>
    );
  }
}

export default withStyles(styles)(BookCreateButton);
