import React, { ReactElement } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import styles from './CommentInput.module.css';

interface Props {
  addComment: (input: any) => void;
  inputRef?: React.MutableRefObject<any>;
}

export default function CommentInput({
  addComment,
  inputRef
}: Props): ReactElement {
  const initialValues = {
    comment: ''
  };

  const validationSchema = Yup.object({
    comment: Yup.string().required('Required')
  });

  const onSubmit = (values, { resetForm }) => {
    console.log('form data', values);
    addComment(values);
    resetForm();
  };

  return (
    <div className={styles.CommentInput}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Field
                type="text"
                label="Comment"
                name="comment"
                placeholder="Add a comment..."
                innerRef={inputRef}
              />
              <button
                className={styles.Button}
                type="submit"
                disabled={
                  !formik.dirty || !formik.isValid || formik.isSubmitting
                }
              >
                Post
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
