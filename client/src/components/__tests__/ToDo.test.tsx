import React from 'react';
import { screen, render } from '@testing-library/react';

import ToDo from '../ToDo';

describe('ToDo', () => {
  const mockTodoProps = {
    title: 'Foo',
    description: 'Bar',
    completed: false,
    createdAt: '2020-01-01T00:00:00Z',
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    toggleComplete: jest.fn(),
  };

  test('should call the proper functions', () => {
    render(<ToDo {...mockTodoProps} />);

    screen.getByRole('checkbox').click();
    expect(mockTodoProps.toggleComplete).toBeCalled();

    screen.getByTestId('delete').click();
    expect(mockTodoProps.onDelete).toBeCalled();

    screen.getByTestId('edit').click();
    expect(mockTodoProps.onEdit).toBeCalled();
  });
});
