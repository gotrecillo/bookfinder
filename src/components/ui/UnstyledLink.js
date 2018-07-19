import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from './styles';

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
    },
  },
});

const UnstyledLink = ({ classes, children, ...props }) =>
  <Link className={classNames(classes.link)} {...props}>
    {children}
  </Link>;

UnstyledLink.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(UnstyledLink);
