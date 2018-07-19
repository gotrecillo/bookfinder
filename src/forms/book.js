import _ from 'lodash';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import isISBN from './validators/isbn';

const plugins = { dvr: validatorjs };
const fields = {
  category: {
    label: 'Categoria',
    rules: 'required|string|between:1,12',
  },
  title: {
    label: 'Titulo',
    rules: 'required|string|between:1,255',
  },
  isbn: {
    label: 'Isbn',
    rules: 'required',
    validators: [form => isISBN(form.field.value)],
  },
  author: {
    label: 'Autor',
    rules: 'required|string|between:1,255',
  },
  published: {
    label: 'Fecha de publicación',
    value: new Date(),
  },
};


const makeBookForm = (values = {}) => {
  const formatedValues = _.reduce(
    values,
    (carry, value, key) => ({ ...carry, [key]: { value } }),
    {},
  );

  const mergedFields = _.merge(formatedValues, fields);

  return new MobxReactForm({ fields: mergedFields }, { plugins });
};

export default makeBookForm;
