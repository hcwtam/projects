import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useDispatch } from 'react-redux';

import Quantity from './Quantity';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

const mockUseDispatch = useDispatch as jest.Mock;
const mockDispatch = jest.fn();

const props = {
  notify: jest.fn()
};

describe('Quantity', () => {
  test('renders Quantity component properly', () => {
    render(<Quantity {...props} />);

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  test('dispatches an action on button click', async () => {
    mockUseDispatch.mockImplementation(() => mockDispatch);
    render(<Quantity {...props} />);

    fireEvent.click(screen.getByText('+'));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(props.notify).toHaveBeenCalledTimes(1);
    });
  });
});
