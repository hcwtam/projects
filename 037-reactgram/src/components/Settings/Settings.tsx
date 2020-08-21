import React, { ReactElement, useContext, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import styles from './Settings.module.css';
import { userContext } from '../../store/user';
import Navbar from '../Navbar/Navbar';

interface Props {}

type FormData = {
  name: string;
  username: string;
  website: string;
  bio: string;
};

export default function Settings({}: Props): ReactElement {
  const userData = useContext(userContext);
  const { avatarUrl, username, fullName, website, bio, uid } =
    userData || false;
  const [imagePreview, setImagePreview] = useState<string>(avatarUrl || '');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(''), 4000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const changeAvatar = async (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result.toString());
    };
    reader.readAsDataURL(file);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'reactgram');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dej7ykooy/image/upload',
      {
        method: 'POST',
        body: data
      }
    );
    const newFile = await res.json();
    await axios.put(
      `https://reactgram-ac3b0.firebaseio.com/users/${uid}.json`,
      {
        ...userData,
        avatarUrl: newFile.secure_url
      }
    );
    setMessage('Profile photo changed succesfully.');
  };

  const initialValues = {
    name: fullName,
    username,
    website,
    bio
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    website: Yup.string(),
    bio: Yup.string()
  });

  const onSubmit = async (values: FormData) => {
    console.log('form data', values);
    await axios.put(
      `https://reactgram-ac3b0.firebaseio.com/users/${uid}.json`,
      {
        ...userData,
        ...values
      }
    );
    setMessage('Changes saved.');
  };

  return (
    <>
      <Navbar avatarUrl={imagePreview} />
      <div className={styles.Settings}>
        <div className={styles.Side}>
          <h1>Edit Profile</h1>
        </div>
        <div className={styles.Form}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <div className={styles.Avatar}>
                    <div className={styles.ImageContainer}>
                      <img src={imagePreview} alt="avatar" />
                    </div>
                    <div className={styles.Username}>
                      {username}
                      <div className={styles.Upload}>
                        Change profile photo
                        <input
                          type="file"
                          name="file"
                          placeholder="change profile photo"
                          onChange={changeAvatar}
                          accept="image/png, image/jpeg, image/jpg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.Field}>
                    <label>Name</label>
                    <Field type="text" name="name" placeholder="Name" />
                  </div>
                  <div className={styles.Field}>
                    <label>Username</label>
                    <Field type="text" name="username" placeholder="Username" />
                  </div>
                  <div className={styles.Field}>
                    <label>Website</label>
                    <Field type="text" name="website" placeholder="Website" />
                  </div>
                  <div className={styles.Field}>
                    <label>Bio</label>
                    <Field
                      type="text"
                      as="textarea"
                      name="bio"
                      placeholder="Bio"
                    />
                  </div>
                  <button
                    className={styles.Button}
                    type="submit"
                    disabled={
                      !formik.dirty || !formik.isValid || formik.isSubmitting
                    }
                  >
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      {message && <div className={styles.Message}>{message}</div>}
    </>
  );
}
