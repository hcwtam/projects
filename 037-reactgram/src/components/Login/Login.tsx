import React, { ReactElement, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import styles from './Login.module.css';
import { login } from '../../utils/auth';
import { authContext } from '../../store/auth';

interface Props {}

type FormData = {
  email: string;
  password: string;
};

export default function Login({}: Props): ReactElement {
  const { setToken, setUserId } = useContext(authContext);

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required')
  });

  const onSubmit = async (values: FormData) => {
    console.log('form data', values);
    const [token, userId] = await login(values);
    setToken(token);
    setUserId(userId);
  };

  return (
    <>
      <div className={styles.Login}>
        <h1>Reactgram</h1>
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
                  Log In
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className={styles.Signup}>
        Don't have an account?{`  `}
        <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
}
