import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import Card from '../ui/Card';
import CardContent from '../ui/CardContent';
import { withStyles } from '../ui/styles';
import TextField from '../ui/TextField';

const styles = theme => ({
  card: {
    margin: `${theme.simpleGutter}`,
    width: '100%',
  },
  inputGroup: {
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  field: {
    width: '300px',
    margin: `${theme.simpleGutter}`,
  },
  disabled: {
    backgroundColor: '#e2e2e2',
    cursor: 'not-allowed',
    '& *': {
      cursor: 'not-allowed',
    },
  },
});

const fieldProps = PropTypes.shape({
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
});

class BookSearcher extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.shape({
      title: fieldProps,
      author: fieldProps,
      category: fieldProps,
      isbn: fieldProps,
    }),
  };

  change = (field) => event => {
    const { filter, setFilter } = this.props;
    const values = _.reduce(filter, (carry, item, key) => ({ ...carry, [key]: item.value }), {});

    const updatedFields = _.merge(values, { [field]: event.target.value });

    setFilter(updatedFields);
  };

  _makeField = (label, key) => {
    const { classes, filter } = this.props;

    return <TextField
      key={key}
      value={filter[key].value}
      disabled={filter[key].disabled}
      onChange={this.change(key)}
      className={classNames(classes.field, filter[key].disabled ? classes.disabled : '')}
      fullWidth={false}
      label={label}
    />;
  };

  render() {
    const { classes } = this.props;

    const fields = { title: 'Titulo', author: 'Autor', category: 'Categoría', isbn: 'ISBN' };

    return (
      <Card className={classNames(classes.card)}>
        <CardContent className={classNames(classes.inputGroup)}>
          {_.map(fields, this._makeField.bind(this))}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(BookSearcher);
