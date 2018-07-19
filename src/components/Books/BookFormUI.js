import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import classNames from 'classnames';
import TextField from '../ui/TextField';
import Button from '../ui/Button';
import UnstyledLink from '../ui/UnstyledLink';
import DatePickerField from '../ui/DatePickerField';
import { withStyles } from '../ui/styles';
import Card from '../ui/Card';
import CardContent from '../ui/CardContent';
import Typography from '../ui/Typography';

const styles = theme => ({
  card: {
    margin: `${theme.simpleGutter} auto`,
    width: '600px',
  },
  actions: {
    marginTop: theme.simpleGutter,
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *': {
      marginLeft: theme.simpleGutter,
    },
  },
});

@inject('routing')
@observer
class BookFormUI extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    redirect: PropTypes.string.isRequired,
    routing: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    form: MobxPropTypes.observableObject.isRequired,

  };

  submit = () => {
    const { form, routing, redirect } = this.props;

    form.submit({
      onSuccess: x => {
        this.props.onSubmit(x.values());
        routing.push(redirect);
      },
      onError: _ => _,
    });
  };

  render() {
    const { form, action, redirect, classes, title } = this.props;

    return (
      <Card className={classNames(classes.card)}>
        <CardContent>
          <form>
            <Typography color="primary" variant="headline">{title}</Typography>
            <TextField field={form.$('title')}/>
            <TextField field={form.$('author')}/>
            <TextField field={form.$('category')}/>
            <TextField field={form.$('isbn')}/>
            <DatePickerField field={form.$('published')}/>
            <div className={classNames(classes.actions)}>
              <UnstyledLink to={redirect}>
                <Button variant="raised">Cancel</Button>
              </UnstyledLink>
              <Button color="primary" variant="raised" onClick={this.submit}>
                {action}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(BookFormUI);