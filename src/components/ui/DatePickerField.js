import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { DatePicker } from 'material-ui-pickers';

@observer
export default class DatePickerField extends Component {
  render() {
    const { field, ...props } = this.props;

    const fieldProps = field ? field.bind() : {};

    return (
      <DatePicker
        fullWidth
        {...fieldProps}
        margin="normal"
        {...props}
        format="DD/MM/YYYY"
      />
    );
  }
}
