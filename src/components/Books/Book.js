import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Card from '../ui/Card';
import CardContent from '../ui/CardContent';
import Typography from '../ui/Typography';
import { withStyles } from '../ui/styles';
import UnstyledLink from '../ui/UnstyledLink';
import FlexPusher from '../ui/FlexPusher';
import Icon from '../ui/Icon';

const styles = theme => ({
  card: {
    margin: theme.simpleGutter,
    width: '400px',
  },
  title: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  icon: {
    marginLeft: theme.spacing.unit * 2,
    fontSize: '14px',
    cursor: 'pointer',
  },
});

class Book extends Component {
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

    const { title, category, author } = book;

    return (
      <Card className={classNames(classes.card)}>
        <CardContent>
          <Typography variant="subheading">
            <UnstyledLink className={classNames(classes.title)} to={`/books/${book.uuid}`}>{title}</UnstyledLink>
          </Typography>
          <div className={classNames(classes.footer)}>
            <Typography variant="caption">{author}</Typography>
            <FlexPusher/>
            <Typography variant="caption">{category}</Typography>
            <UnstyledLink to={`/books/${book.uuid}/update`}>
              <Icon color="primary" className={classNames(classes.icon, 'fa fa-edit')}/>
            </UnstyledLink>
            <Icon color="error" className={classNames(classes.icon, 'fa fa-trash')} onClick={this.delete}/>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Book);
