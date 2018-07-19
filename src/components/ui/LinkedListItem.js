import React  from 'react';
import PropTypes from 'prop-types';

import ListItem from '../ui/ListItem';
import ListItemText from '../ui/ListItemText';
import UnstyledLink from '../ui/UnstyledLink';

const LinkedListItem = ({ to, label }) =>
  <ListItem button>
    <UnstyledLink to={to}>
      <ListItemText>{label}</ListItemText>
    </UnstyledLink>
  </ListItem>;

LinkedListItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default LinkedListItem;
