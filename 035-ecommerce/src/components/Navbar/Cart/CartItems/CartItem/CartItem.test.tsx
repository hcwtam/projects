import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useDispatch } from 'react-redux';
import { addToCart, subtractFromCart } from '../../../../../actions';

import CartItem from './CartItem';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

const mockUseDispatch = useDispatch as jest.Mock;
const mockDispatch = jest.fn();

const props = {
  id: 0,
  name: 'apple',
  price: 0.4,
  imageURL: 'apple.png',
  quantity: 2
};

describe('CartItem', () => {
  test('renders CartItem component properly', () => {
    render(<CartItem {...props} />);

    expect(screen.getByAltText('apple')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('dispatches an action on button click', () => {
    mockUseDispatch.mockImplementation(() => mockDispatch);
    render(<CartItem {...props} />);

    fireEvent.click(screen.getByText('+'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      addToCart({ quantity: 1 }, props)
    );

    fireEvent.click(screen.getByText('−'));
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(
      subtractFromCart(props.id, props.price)
    );
  });
});
