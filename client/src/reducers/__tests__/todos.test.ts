import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer, { createTodo, deleteTodo, fetchTodos, updateTodo } from '../todos';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockTodos = [
  {
    id: 2,
    title: '2',
    description: null,
    completed: false,
    createdAt: '2020-01-02T00:00:00Z',
    updatedAt: '2020-01-02T00:00:00Z',
  },
  {
    id: 1,
    title: '1',
    description: null,
    completed: false,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2020-01-01T00:00:00Z',
  },
];

const mockStore = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

const API_URL = process.env.REACT_APP_API_URL;

describe('todos reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchTodos', () => {
    test('should fetch and store the todos', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockTodos });

      await mockStore.dispatch(fetchTodos());

      expect(mockedAxios.get).toBeCalledWith(`${API_URL}/todos/`);
      expect(mockStore.getState().todos).toStrictEqual({
        loading: false,
        error: null,
        todos: [mockTodos[0], mockTodos[1]],
      });
    });

    test('should store the error when it fails', async () => {
      mockedAxios.get.mockRejectedValue({ response: { data: { message: 'error' } } });

      await mockStore.dispatch(fetchTodos());

      expect(mockedAxios.get).toBeCalledWith(`${API_URL}/todos/`);
      expect(mockStore.getState().todos).toMatchObject({
        loading: false,
        error: 'error',
      });
    });
  });

  describe('updateTodo', () => {
    test('should update a specific todo', async () => {
      mockedAxios.put.mockResolvedValueOnce({ data: { ...mockTodos[1], completed: true } });

      await mockStore.dispatch(updateTodo({ id: 1, completed: true }));

      expect(mockedAxios.put).toBeCalledWith(`${API_URL}/todos/1`, {
        completed: true,
      });
      expect(mockStore.getState().todos).toStrictEqual({
        loading: false,
        error: null,
        todos: [mockTodos[0], { ...mockTodos[1], completed: true }],
      });
    });

    test('should store the error when it fails', async () => {
      mockedAxios.put.mockRejectedValue({ response: { data: { message: 'error' } } });

      await mockStore.dispatch(updateTodo({ id: 1, completed: true }));

      expect(mockStore.getState().todos).toMatchObject({
        loading: false,
        error: 'error',
      });
    });
  });

  describe('createTodo', () => {
    test('should add a new todo', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { ...mockTodos[1], completed: true, id: 3, title: '3' },
      });

      await mockStore.dispatch(createTodo({ title: '3', completed: true }));

      expect(mockedAxios.post).toBeCalledWith(`${API_URL}/todos/`, {
        title: '3',
        completed: true,
      });
      expect(mockStore.getState().todos).toStrictEqual({
        loading: false,
        error: null,
        todos: [
          mockTodos[0],
          { ...mockTodos[1], completed: true },
          { ...mockTodos[1], completed: true, id: 3, title: '3' },
        ],
      });
    });

    test('should store the error when it fails', async () => {
      mockedAxios.post.mockRejectedValue({ response: { data: { message: 'error' } } });

      await mockStore.dispatch(createTodo({ title: '3', completed: true }));

      expect(mockStore.getState().todos).toMatchObject({
        loading: false,
        error: 'error',
      });
    });
  });

  describe('deleteTodo', () => {
    test('should delete a specific todo', async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      await mockStore.dispatch(deleteTodo(3));

      expect(mockedAxios.delete).toBeCalledWith(`${API_URL}/todos/3`);
      expect(mockStore.getState().todos).toStrictEqual({
        loading: false,
        error: null,
        todos: [mockTodos[0], { ...mockTodos[1], completed: true }],
      });
    });

    test('should store the error when it fails', async () => {
      mockedAxios.delete.mockRejectedValue({ response: { data: { message: 'error' } } });

      await mockStore.dispatch(deleteTodo(3));

      expect(mockStore.getState().todos).toMatchObject({
        loading: false,
        error: 'error',
      });
    });
  });
});
