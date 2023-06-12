import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FormOne from './FormOne';

describe('FormOne', () => {
  test('should show validation error for RoomTypeID field if it is empty', async () => {
    render(<FormOne />);

    const submitButton = screen.getByRole('button', { name: /Create Room Type/i });

    fireEvent.click(submitButton);

    const validationError = await screen.findByText(/Required/i);

    expect(validationError).toBeInTheDocument();
    expect(validationError).toHaveAttribute('name', 'RoomTypeID');
  });
});
