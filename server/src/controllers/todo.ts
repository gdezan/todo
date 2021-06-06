import { DeleteResult, getRepository } from 'typeorm';
import ToDo from '../models/todo';

interface TodoPayload {
  title?: string;
  description?: string;
  completed: boolean;
}

export default class TodoController {
  public static async createTodo(todo: TodoPayload): Promise<ToDo> {
    const todoRepository = getRepository(ToDo);
    const newTodo = todoRepository.create(todo);
    return todoRepository.save(newTodo);
  }

  public static async getTodo(id: string): Promise<ToDo | undefined> {
    const todoRepository = getRepository(ToDo);
    return todoRepository.findOne(id);
  }

  public static async getTodos(): Promise<Array<ToDo>> {
    const todoRepository = getRepository(ToDo);
    return todoRepository.find();
  }

  public static async updateTodo(
    id: string,
    changes: TodoPayload,
  ): Promise<ToDo | null> {
    const todoRepository = getRepository(ToDo);
    const todo = await todoRepository.findOne(id);

    if (!todo) {
      return null;
    }

    todoRepository.merge(todo, changes);
    return todoRepository.save(todo);
  }

  public static async deleteTodo(id: string): Promise<DeleteResult | null> {
    const todoRepository = getRepository(ToDo);
    return todoRepository.delete(id);
  }
}
