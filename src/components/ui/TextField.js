import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MDTextField from '@material-ui/core/TextField';

@observer
export default class TextField extends Component {
  render() {
    const { field, type = 'text', ...props } = this.props;

    const hasError = field && !!field.error;

    const fieldProps = field ? field.bind() : {};

    return (
      <MDTextField
        {...fieldProps}
        type={type}
        error={hasError}
        helperText={hasError ? field.error : null}
        fullWidth
        margin="normal"
        {...props}
      />
    );
  }
}
