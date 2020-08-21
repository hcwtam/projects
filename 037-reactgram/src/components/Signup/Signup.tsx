import React, { ReactElement, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import styles from './Signup.module.css';
import { signup, usernameExists } from '../../utils/auth';
import { authContext } from '../../store/auth';

interface Props {}

type FormData = {
  email: string;
  fullName: string;
  password: string;
  username: string;
};

export default function Login({}: Props): ReactElement {
  const { setToken, setUserId } = useContext(authContext);
  const history = useHistory();

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

  const onSubmit = async (values: FormData) => {
    console.log('form data', values);
    if (await usernameExists(values.username))
      throw new Error('Username exists');
    const [token, userId] = await signup(values);
    setToken(token);
    setUserId(userId);
    history.push('/');
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
        <Link to="/">Log in</Link>
      </div>
    </>
  );
}
