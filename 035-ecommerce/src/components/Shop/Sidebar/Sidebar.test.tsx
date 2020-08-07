import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Sidebar from './Sidebar';

const setActive = jest.fn();

describe('Sidebar', () => {
  test('renders Sidebar component properly', () => {
    render(<Sidebar setActive={setActive} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(6);
  });

  test('changes to respective category when clicked and has "active" class', () => {
    render(<Sidebar setActive={setActive} />);

    fireEvent.click(screen.getByAltText('favourites'));
    expect(setActive).toHaveBeenCalledTimes(1);
    expect(screen.getByAltText('favourites').closest('li')).toHaveClass(
      'active'
    );
  });
});
