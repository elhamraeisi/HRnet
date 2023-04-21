/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import Error from './../pages/Error';

describe('Error', () => {
  test('renders error message', () => {
    const { getByText } = render(<Error />);
    const titleElement = getByText("404");
    const messageElement = getByText(/Oups! La page que vous demandez n'existe pas./i);
    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });
});
