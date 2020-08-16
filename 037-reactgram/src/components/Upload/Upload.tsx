import React, { ReactElement, useState, useContext } from 'react';
import * as Yup from 'yup';
import { Field, Formik, Form } from 'formik';
import 'react-responsive-modal/styles.css';

import { Modal } from 'react-responsive-modal';
import { CloseIcon } from '../../assets/svg/icons';
import styles from './Upload.module.css';
import ProfilePicture from '../shared/ProfilePicture/ProfilePicture';
import { userContext } from '../../store/user';
import { uploadPost } from '../../utils/posts';

interface Props {
  avatarUrl: string;
}

export default function Upload({ avatarUrl }: Props): ReactElement {
  const userData = useContext(userContext);
  const { username, userId } = userData;

  const [image, setImage] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result.toString());
    };
    reader.readAsDataURL(file);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'reactgram');
    setOpen(true);
    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dej7ykooy/image/upload',
        {
          method: 'POST',
          body: data
        }
      );
      const newFile = await res.json();
      setImage(newFile.secure_url);
    } catch {
      setOpen(false);
    }
  };

  const closeUpload = () => {
    setOpen(false);
    setImage('');
  };

  // Formik
  const initialValues = {
    caption: ''
  };

  const validationSchema = Yup.object({
    caption: Yup.string().required('Required')
  });

  const onSubmit = (values) => {
    console.log('form data', values);
    const postData = {
      ...values,
      time: Date.now(),
      imageUrl: image,
      posterName: username,
      posterId: userId,
      avatarUrl
    };
    uploadPost(postData);
    setOpen(false);
  };

  return (
    <>
      <input
        type="file"
        name="file"
        placeholder="upload image"
        onChange={uploadImage}
        accept="image/png, image/jpeg, image/jpg"
      />

      <Modal
        open={open}
        onClose={closeUpload}
        center
        showCloseIcon={false}
        animationDuration={0}
        classNames={{ overlay: styles.Overlay, modal: styles.Modal }}
      >
        <div className={styles.CloseIcon} onClick={closeUpload}>
          <CloseIcon />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <header>
                  <h1>New post</h1>
                  <button
                    className={styles.Button}
                    type="submit"
                    disabled={
                      !formik.dirty ||
                      !formik.isValid ||
                      formik.isSubmitting ||
                      !image
                    }
                  >
                    Share
                  </button>
                </header>
                <section>
                  <ProfilePicture
                    avatarUrl={avatarUrl}
                    style={{ width: 30, height: 30 }}
                  />

                  <Field
                    type="text"
                    as="textarea"
                    label="Caption"
                    name="caption"
                    placeholder="Write a caption..."
                  />
                  <div className={styles.ImageContainer}>
                    <img src={imagePreview} alt="upload img" />
                  </div>
                </section>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
}
