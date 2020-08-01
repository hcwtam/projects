import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../reducers';
import { auth } from '../../actions';
import FormikControl from './FormikControl';
import './formControl.css';

function LoginForm() {
  const initialValues = {
    email: '',
    password: ''
  };

  const dispatch = useDispatch();

  const onAuth = (email, password) => dispatch(auth(email, password, true));

  const error = useSelector((state: RootState) => state.auth.error);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required')
  });

  const onSubmit = (values) => {
    console.log('form data', values);
    const { email, password } = values;
    onAuth(email, password);
  };

  let errorMessage = null;
  if (error)
    errorMessage = (
      <div className="error">
        {error.message.charAt(0) +
          error.message.slice(1).replace(/_/gi, ' ').toLowerCase()}
      </div>
    );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
            />
            {error ? errorMessage : null}
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
