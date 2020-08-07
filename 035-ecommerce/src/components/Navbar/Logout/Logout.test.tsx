import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useDispatch } from 'react-redux';

import { logout } from '../../../actions';
import Logout from './Logout';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

const mockUseDispatch = useDispatch as jest.Mock;
const mockDispatch = jest.fn();

describe('Logout', () => {
  test('renders Logout component properly', () => {
    const { container } = render(<Logout />);

    expect(container.firstChild.firstChild).toHaveClass('fa fa-sign-out');
  });

  test('dispatches an action on click', () => {
    mockUseDispatch.mockImplementation(() => mockDispatch);
    const { container } = render(<Logout />);

    fireEvent.click(container.firstChild);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(logout());
  });
});
