import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import FormikControl from './FormikControl';
import './formControl.css';
import styles from './Quantity.module.css';
import { addToCart } from '../../actions';

function Quantity(props) {
  const { notify } = props;

  const dispatch = useDispatch();

  const initialValues = {
    quantity: 1
  };

  const validationSchema = Yup.object({
    quantity: Yup.number().required('required').min(1).integer()
  });

  const onSubmit = (values) => {
    dispatch(addToCart(values, props));
    notify();
  };

  return (
    <span className={styles.Quantity} onClick={(e) => e.stopPropagation()}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className={styles.form}>
              <FormikControl
                control="input"
                type="number"
                name="quantity"
                label=""
              />

              <button type="submit" disabled={!formik.isValid}>
                +
              </button>
            </Form>
          );
        }}
      </Formik>
    </span>
  );
}

export default Quantity;
