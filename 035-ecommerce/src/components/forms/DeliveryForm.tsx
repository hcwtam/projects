import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import { useDispatch, useSelector } from 'react-redux';

import { uploadUserDetail, addUserDetail } from '../../actions';
import './formControl.css';
import { RootState } from '../../reducers';
import axios from 'axios';

function DeliveryForm({ submitted }) {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const token = useSelector((state: RootState) => state.auth.token);

  const [initialValues, setInitialValues] = useState({
    fullName: '',
    contactNumber: '',
    street1: '',
    street2: '',
    city: ''
  });

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Required'),
    contactNumber: Yup.number()
      .typeError('Please provide phone number')
      .required('Required'),
    street1: Yup.string().required('Required'),
    street2: Yup.string().required('Required'),
    city: Yup.string().required('Required')
  });

  useEffect(() => {
    if (token && userId) {
      axios
        .get(
          `https://ecommerce-5bec3.firebaseio.com/users.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        )
        .then((res) => {
          console.log(res.data);
          for (let key in res.data) {
            setInitialValues({
              ...res.data[key]
            });
          }
        });
    }
  }, [token, userId]);

  const onSubmit = (values) => {
    console.log('form data', values);
    dispatch(addUserDetail(values));
    if (userId && token) dispatch(uploadUserDetail(values, userId, token));
    submitted();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <h4>Recipient details</h4>
            <FormikControl
              control="input"
              type="text"
              label="Full name"
              name="fullName"
            />
            <FormikControl
              control="input"
              type="tel"
              label="Contact number"
              name="contactNumber"
            />
            <h4>Delivery address</h4>
            <FormikControl
              control="input"
              type="text"
              label="Street 1"
              name="street1"
            />
            <FormikControl
              control="input"
              type="text"
              label="Street 2"
              name="street2"
            />
            <FormikControl
              control="input"
              type="text"
              label="City"
              name="city"
            />

            <button type="submit" disabled={!formik.isValid}>
              Next
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default DeliveryForm;
