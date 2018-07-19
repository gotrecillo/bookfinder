import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from './styles';
import Card from './Card';



const styles = theme => ({
  wrapper: {
    padding: '24px',
    maxWidth: '1300px',
    margin: '2em auto',
  },
  card: {
    textAlign: 'center',
    padding: '3em'
  }
});

const Spinner = ({classes}) => (
  <div className={classNames(classes.wrapper)}>
    <Card className={classNames(classes.card)}>
      <CircularProgress />
    </Card>
  </div>
);

Spinner.propTypes = {
  classes: PropTypes.object,
};


export default withStyles(styles)(Spinner);
