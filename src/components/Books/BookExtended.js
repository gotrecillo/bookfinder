import React, { Component } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import classNames from 'classnames';
import Card from '../ui/Card';
import CardContent from '../ui/CardContent';
import Typography from '../ui/Typography';
import { withStyles } from '../ui/styles';
import UnstyledLink from '../ui/UnstyledLink';
import Icon from '../ui/Icon';
import BookViewers from './BookViewers';

const styles = theme => ({
  card: {
    margin: `${theme.simpleGutter} auto`,
    width: '600px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: theme.spacing.unit * 2,
    cursor: 'pointer',
  },
});

class BookExtended extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    book: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isbn: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }),
    deleteBook: PropTypes.func.isRequired,
  };

  delete = () => {
    this.props.deleteBook(this.props.book.uuid);
  };

  render() {
    const { book, classes } = this.props;
    const { title, category, author, isbn, published, uuid } = book;

    return (
      <Card className={classNames(classes.card)}>
        <CardContent>
          <div className={classNames(classes.actions)}>
            <Icon color="error" className={classNames(classes.icon, 'fa fa-trash')} onClick={this.delete}/>
            <UnstyledLink to={`/books/${uuid}/update`}>
              <Icon color="primary" className={classNames(classes.icon, 'fa fa-edit')}/>
            </UnstyledLink>
          </div>
          <Typography gutterBottom color="primary" variant="subheading">{title}</Typography>
          <Typography gutterBottom>Autor - {author}</Typography>
          <Typography gutterBottom>Categoría - {category}</Typography>
          <Typography gutterBottom>ISBN - {isbn}</Typography>
          <Typography gutterBottom>Publicado - {format(published, 'DD/MM/YYYY')}</Typography>
          <BookViewers users={book.users}/>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(BookExtended);
