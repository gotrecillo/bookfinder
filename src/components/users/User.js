import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Card from '../ui/Card';
import CardContent from '../ui/CardContent';
import Typography from '../ui/Typography';
import CardHeader from '../ui/CardHeader';
import List from '../ui/List';
import LinkedListItem from '../ui/LinkedListItem';

const styles = theme => ({
  card: {
    marginTop: '2em',
  },
});

class User extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      books: PropTypes.arrayOf(
        PropTypes.shape({
          uuid: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  };

  render() {
    const { user, classes } = this.props;

    return (
      <Card className={classNames(classes.card)}>
        <CardHeader title={user.name}/>
        <CardContent>
          <Typography color="primary" variant="subheading" gutterBottom>
            Libros vistos
          </Typography>
          {_.isEmpty(user.books)
            ? <Typography variant="subheading">El usuario todavia no ha consultado ningún libro</Typography>
            : <List>
              {user.books.map(book => <LinkedListItem to={`/books/${book.uuid}`} label={book.title} key={book.uuid}/>)}
            </List>
          }

        </CardContent>

      </Card>
    );
  }
}

export default withStyles(styles)(User);
