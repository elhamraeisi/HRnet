/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Employee from './../pages/Employee';
import { BrowserRouter as Router } from 'react-router-dom';

const mockEmployees = [
  {
    id: 1,
    name: 'John',
    lastname: 'Doe',
    birthday: '1990-01-01',
    startdate: '2020-01-01',
    street: '123 Main St',
    state: 'CA',
    zipcode: '12345',
    department: { label: 'Sales' }
  },
  {
    id: 2,
    name: 'Jane',
    lastname: 'Smith',
    birthday: '1995-02-02',
    startdate: '2021-02-02',
    street: '456 Oak Ave',
    state: 'NY',
    zipcode: '67890',
    department: { label: 'Marketing' }
  }
]
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

  // it('displays employee data correctly', () => {
  //   jest.mock('react-redux', () => ({
  //     useDispatch: jest.fn(),
  //     useSelector: jest.fn(),
  //   }));
  //   render(<Employee />, { wrapper: Router });

  //   const johnName = screen.getByText('John');
  //   const janeStartDate = screen.getByText('2/2/2021');
  //   const marketingDepartment = screen.getByText('Marketing');
  //   expect(johnName).toBeDefined();
  //   expect(janeStartDate).toBeDefined();
  //   expect(marketingDepartment).toBeDefined();
  // });

});

