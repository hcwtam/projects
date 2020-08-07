// counter.test.js
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { useSelector } from 'react-redux';

import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Orders from './Orders';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

const useSelectorMock = useSelector as any;

jest.mock('../Navbar/Navbar', () => () => null);

test('redirects from Success component to shop with redux with defaults on load', () => {
  useSelectorMock.mockImplementationOnce(jest.fn(() => '0'));
  useSelectorMock.mockImplementationOnce(
    jest.fn(() => [
      {
        items: [
          {
            id: 0,
            imageURL: 'apple.png',
            name: 'apple',
            price: 0.4,
            quantity: 4
          },
          {
            id: 2,
            imageURL: 'banana.png',
            name: 'banana',
            price: 0.5,
            quantity: 4
          },
          {
            id: 7,
            imageURL: 'lemon.png',
            name: 'lemon',
            price: 0.7,
            quantity: 5
          },
          {
            id: 9,
            imageURL: 'mango.png',
            name: 'mango',
            price: 1.2,
            quantity: 5
          }
        ],
        timestamp: '2020-08-01T09:44:51.534Z',
        totalPrice: 13.099999999999998,
        userId: 'tdQpc0YerzS99kjzp7IvM8g1tM13'
      }
    ])
  );
  render(<Orders />);
  expect(screen.getByText('01 Aug 2020')).toBeInTheDocument();
  expect(screen.getByText('$13.10')).toBeInTheDocument();

  // test('can render with redux with custom initial state', () => {
  //   render(<Counter />, {
  //     initialState: { count: 3 },
  //   })
  //   fireEvent.click(screen.getByText('-'))
  //   expect(screen.getByTestId('count-value')).toHaveTextContent('2')
  // })

  // test('can render with redux with custom store', () => {
  //   // this is a silly store that can never be changed
  //   const store = createStore(() => ({ count: 1000 }))
  //   render(<Counter />, {
  //     store,
  //   })
  //   fireEvent.click(screen.getByText('+'))
  //   expect(screen.getByTestId('count-value')).toHaveTextContent('1000')
  //   fireEvent.click(screen.getByText('-'))
  //   expect(screen.getByTestId('count-value')).toHaveTextContent('1000')
});
