import express from 'express';
import ToDoController from '../controllers/todo';

const TodoRouter = express.Router();

TodoRouter.post('/', async (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || title.length === 0) {
    return res.status(400).send('The ToDo needs a title');
  }

  const createdTodo = await ToDoController.createTodo({
    title,
    description,
    completed,
  });
  return res.status(201).json(createdTodo);
});

TodoRouter.get('/:id', async (req, res) => {
  const foundTodo = await ToDoController.getTodo(req.params.id);
  if (!foundTodo) {
    return res.status(404).send('ToDo not found');
  }
  return res.status(200).json(foundTodo);
});

TodoRouter.get('/', async (req, res) => {
  const todoList = await ToDoController.getTodos();
  return res.status(200).json(todoList);
});

TodoRouter.put('/:id', async (req, res) => {
  const { title, description, completed } = req.body;

  if (title?.length === 0) {
    return res.status(400).send('The ToDo needs a title');
  }

  const updatedTodo = await ToDoController.updateTodo(req.params.id, {
    title,
    description,
    completed,
  });

  if (!updatedTodo) {
    return res.status(404).send('ToDo not found');
  }

  return res.status(200).json(updatedTodo);
});

TodoRouter.delete('/:id', async (req, res) => {
  await ToDoController.deleteTodo(req.params.id);
  return res.status(204).send();
});

export default TodoRouter;
