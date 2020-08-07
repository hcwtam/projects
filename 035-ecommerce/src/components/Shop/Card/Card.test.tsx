import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'react-redux';
import 'react-router-dom';

import Card from './Card';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

const props = {
  id: 0,
  name: 'apple',
  price: 0.4,
  imageURL: 'apple.png',
  shortDescription: 'UK'
};

describe('Card', () => {
  test('renders Card component properly', () => {
    render(<Card {...props} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('UK')).toBeInTheDocument();
    expect(screen.getByText('$0.40')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  test('change class on button click', () => {
    const addedNotifier = jest.fn();
    render(<Card {...props} />);

    fireEvent.click(screen.getByText('+'));
    waitFor(() => {
      expect(addedNotifier).toBeCalledTimes(1);
    });
  });

  test('change class on button click', () => {
    const { container } = render(<Card {...props} />);

    fireEvent.click(container.firstChild);
    expect(mockHistoryPush).toBeCalledWith(`/product/${props.id}`, props);
  });
});
