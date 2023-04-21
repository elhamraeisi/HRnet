/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Home from './../pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';



jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Form', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    jest.clearAllMocks()
  });

  test('renders form with all fields and submit button', async () => {
    render(<Home />, { wrapper: Router });


    expect(screen.getByText('First Name')).toBeDefined();
    expect(screen.getByText('Last Name')).toBeDefined();
    expect(screen.getByText('Date of Birth')).toBeDefined();
    expect(screen.getByText('Start Date')).toBeDefined();
    expect(screen.getByText('Street')).toBeDefined();
    expect(screen.getByText('State')).toBeDefined();
    expect(screen.getByText('Department')).toBeDefined();
  });

  test('updates form data when fields are filled', () => {
    render(<Home />, { wrapper: Router });
    ;

    const nameInput = screen.getByTestId('firstName-input');
    const lastnameInput = screen.getByTestId('lastName-input');
    const streetInput = screen.getByTestId('street-input');
    const zipCodeInput = screen.getByTestId('zipcode-input');

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(lastnameInput, { target: { value: 'Doe' } });
    fireEvent.change(streetInput, { target: { value: '123 Main St' } });
    fireEvent.change(zipCodeInput, { target: { value: '12345' } });

    expect(nameInput.value).toBe('John');
    expect(lastnameInput.value).toBe('Doe');
    expect(streetInput.value).toBe('123 Main St');
    expect(zipCodeInput.value).toBe('12345');
  });

  test('displays error message when name input is less than 3 characters long', () => {
    render(<Home />, { wrapper: Router });

    const nameInput = screen.getByTestId('firstName-input');

    fireEvent.change(nameInput, { target: { value: 'Jo' } });

    expect(nameInput.value).toBe('Jo');
    expect(screen.getByText('Invalid input. Input must be at least 3 characters long.')).toBeDefined();
  });
});
