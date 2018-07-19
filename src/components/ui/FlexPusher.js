import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '../ui/styles';

const styles = theme => ({
  pusher: {
    flexGrow: '999',
  },
});

const FlexPusher = ({ classes }) => <div className={classNames(classes.pusher)}/>;

FlexPusher.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlexPusher);
