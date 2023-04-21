/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Employee from './../pages/Employee';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Table', () => {
  it('updates global filter correctly when search text is entered', () => {
    render(<Employee />, { wrapper: Router });
    const searchInput = screen.getByTestId('globalSearch');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(searchInput.value).toBe('John');
  });


  it('displays the correct header', () => {
    render(<Employee />, { wrapper: Router });
    const header = screen.getByText('Current Employees');
    expect(header).toBeDefined();
  });

});

