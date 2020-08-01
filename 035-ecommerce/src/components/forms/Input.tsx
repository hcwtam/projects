import React from 'react';
import { Field, ErrorMessage } from 'formik';

import TextError from './TextError';

interface InputProps {
  label?: string;
  name?: string;
  rest?: {};
  type?: string;
}

function Input({ label, name, ...rest }: InputProps) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      {label === '' ? null : <ErrorMessage name={name} component={TextError} />}
    </div>
  );
}

export default Input;
