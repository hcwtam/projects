import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

import Spinner from '../UI/Spinner';
import { RootState } from '../../reducers';
import LoginForm from '../forms/LoginForm';
import RegistrationForm from '../forms/RegistrationForm';
import styles from './Navbar.module.css';
import Logout from './Logout/Logout';
import Cart from './Cart/Cart';
import { useHistory } from 'react-router-dom';
import Tippy from '@tippyjs/react';

type AppProps = { white?: Boolean };

Modal.setAppElement('#root');

function Navbar({ white }: AppProps) {
  const [openModal, setOpenModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const history = useHistory();

  const loading = useSelector((state: RootState) => state.auth.loading);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) setOpenModal(false);
  }, [token]);

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(145, 145, 145, 0.5)'
    },
    content: {
      height: 550,
      width: 500,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px 40px',
      borderRadius: 10
    }
  };

  const loginForm = (
    <>
      <h1>Sign in</h1>
      <div
        style={{
          marginBottom: 50,
          color: '#555',
          fontSize: '0.9rem',
          fontWeight: 'bold'
        }}
      >
        New user?{' '}
        <span
          style={{
            cursor: 'pointer',
            color: '#1B7DE9'
          }}
          onClick={() => setShowLogin(false)}
        >
          Create an account
        </span>
      </div>
      <LoginForm />
    </>
  );

  const signupForm = (
    <>
      <h1>Create an account</h1>
      <div
        style={{
          marginBottom: 50,
          color: '#555',
          fontSize: '0.9rem',
          fontWeight: 'bold'
        }}
      >
        Already have an account?{' '}
        <span
          style={{
            cursor: 'pointer',
            color: '#1B7DE9'
          }}
          onClick={() => setShowLogin(true)}
        >
          Sign in
        </span>
      </div>
      <RegistrationForm />
    </>
  );

  return (
    <>
      <div
        className={white ? `${styles.Navbar} ${styles.white}` : styles.Navbar}
      >
        <div onClick={() => history.push('/shop')}>fruity</div>
        <div className={styles.icons}>
          {token ? (
            <>
              <Logout />
              <Tippy content="Order history">
                <i
                  style={{ margin: '0 40px 0 -10px' }}
                  onClick={() => history.push('/orders')}
                  className="fa fa-list-alt"
                />
              </Tippy>
            </>
          ) : (
            <span onClick={() => setOpenModal(true)}>Login</span>
          )}
          <Tippy content="View cart">
            <div style={{ marginBottom: 1 }}>
              <Cart />
            </div>
          </Tippy>
        </div>
      </div>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={modalStyles}
      >
        {loading ? <Spinner /> : showLogin ? loginForm : signupForm}
      </Modal>
    </>
  );
}

export default Navbar;
