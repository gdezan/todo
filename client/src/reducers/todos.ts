import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ToDoType } from '../types';

interface TodosState {
  todos: ToDoType[] | null;
  loading: boolean;
  error: string | null;
}

interface TodoError {
  message: string;
}

const initialState: TodosState = {
  todos: null,
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk<ToDoType[], void, { rejectValue: TodoError }>(
  'todos/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      return response.data.sort((a: ToDoType, b: ToDoType) =>
        a.createdAt.localeCompare(b.createdAt)
      );
    } catch (err) {
      const error: AxiosError<TodoError> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTodo = createAsyncThunk<
  ToDoType,
  { id: number } & Partial<ToDoType>,
  { rejectValue: TodoError }
>('todos/update', async ({ id, ...changes }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`http://localhost:5000/todos/${id}`, changes);
    return response.data;
  } catch (err) {
    const error: AxiosError<TodoError> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const createTodo = createAsyncThunk<ToDoType, Partial<ToDoType>, { rejectValue: TodoError }>(
  'todos/create',
  async (newTodoData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5000/todos/`, newTodoData);
      return response.data;
    } catch (err) {
      const error: AxiosError<TodoError> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodo = createAsyncThunk<{ id: number }, number, { rejectValue: TodoError }>(
  'todos/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      return { id };
    } catch (err) {
      const error: AxiosError<TodoError> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Todos
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    });

    // Update Todo
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? null;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const todoIndex = state.todos?.findIndex((todo) => todo.id === action.payload.id) ?? -1;
      if (todoIndex >= 0 && state.todos) {
        state.todos[todoIndex] = action.payload;
      }
      state.loading = false;
    });

    // Delete Todo
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? null;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const todoIndex = state.todos?.findIndex((todo) => todo.id === action.payload.id) ?? -1;
      state.todos?.splice(todoIndex, 1);
      state.loading = false;
    });

    // Create Todo
    builder.addCase(createTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? null;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todos?.push(action.payload);
      state.loading = false;
    });
  },
});

export default todosSlice.reducer;
