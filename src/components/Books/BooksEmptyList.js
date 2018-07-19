import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '../ui/CardContent';
import Typography from '../ui/Typography';
import { withStyles } from '../ui/styles';
import classNames from 'classnames';

const styles = theme => ({
  card: {
    width: '400px',
    margin: '1.5em auto',
    padding: '1.5em',
  },
});

class BooksEmptyList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classNames(classes.card)}>
        <CardContent>
          <Typography variant="subheading">
            No se encuentran libros con estos criterios
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(BooksEmptyList);
