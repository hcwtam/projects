import React, { ReactElement } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import styles from './Signup.module.css';

interface Props {}

export default function Login({}: Props): ReactElement {
  const initialValues = {
    email: '',
    fullName: '',
    username: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    fullName: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  });

  const onSubmit = (values: any) => {
    console.log('form data', values);
  };

  return (
    <>
      <div className={styles.Signup}>
        <h1>Reactgram</h1>
        <h2>Sign up to see photos and videos from your friends.</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Field
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Email"
                />
                <Field
                  type="text"
                  label="Full name"
                  name="fullName"
                  placeholder="Full Name"
                />
                <Field
                  type="text"
                  label="Username"
                  name="username"
                  placeholder="Username"
                />
                <Field
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Password"
                />
                <button
                  className={styles.Button}
                  type="submit"
                  disabled={
                    !formik.dirty || !formik.isValid || formik.isSubmitting
                  }
                >
                  Sign up
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className={styles.Login}>
        Have an account?{`  `}
        <Link to="/login">Log in</Link>
      </div>
    </>
  );
}
