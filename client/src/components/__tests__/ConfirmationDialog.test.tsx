import React from 'react';
import { screen, render } from '@testing-library/react';

import ConfirmationDialog from '../ConfirmationDialog';

describe('ConfirmationDialog', () => {
  const mockDialogProps = {
    title: 'Foo',
    subtitle: 'Bar',
    isOpen: true,
    isLoading: false,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
  };

  test('should render properly', () => {
    render(<ConfirmationDialog {...mockDialogProps} />);

    expect(screen.getByText('Foo')).toBeInTheDocument();
    expect(screen.getByText('Bar')).toBeInTheDocument();

    screen.getByRole('button', { name: 'Yes' }).click();
    expect(mockDialogProps.onConfirm).toBeCalled();

    screen.getByRole('button', { name: 'No' }).click();
    expect(mockDialogProps.onClose).toBeCalled();
  });
});
