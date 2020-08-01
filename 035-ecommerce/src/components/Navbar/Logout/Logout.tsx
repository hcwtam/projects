import React from 'react';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';

import { logout } from '../../../actions';
import 'tippy.js/dist/tippy.css';

function Logout() {
  const dispatch = useDispatch();
  return (
    <span onClick={() => dispatch(logout())}>
      <Tippy content="Logout">
        <i
          style={{ fontSize: '1.5rem' }}
          className="fa fa-sign-out"
          aria-hidden="true"
        />
      </Tippy>
    </span>
  );
}

export default Logout;
