import express from "express";
import ToDoController from "../controllers/todo";

const TodoRouter = express.Router();

TodoRouter.post("/", async (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || title.length === 0) {
    return res.status(400).send("The ToDo needs a title");
  }

  try {
    const createdTodo = await ToDoController.createTodo({
      title,
      description,
      completed,
    });
    return res.status(201).json(createdTodo);
  } catch (error) {
    console.error("Error while creating ToDo:", error.message);
    return res.status(500).json(error.message);
  }
});

TodoRouter.get("/:id", async (req, res) => {
  try {
    const foundTodo = await ToDoController.getTodo(req.params.id);
    if (!foundTodo) {
      return res.status(404).send("ToDo not found");
    }
    return res.status(200).json(foundTodo);
  } catch (error) {
    console.error("Error while getting ToDo:", error.message);
    return res.status(500).json(error.message);
  }
});

TodoRouter.get("/", async (req, res) => {
  try {
    const todoList = await ToDoController.getTodos();
    return res.status(200).json(todoList);
  } catch (error) {
    console.error("Error while getting ToDo:", error.message);
    return res.status(500).json(error.message);
  }
});

TodoRouter.put("/:id", async (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || title.length === 0) {
    return res.status(400).send("The ToDo needs a title");
  }

  try {
    const updatedTodo = await ToDoController.updateTodo(req.params.id, {
      title,
      description,
      completed,
    });

    if (!updatedTodo) {
      return res.status(404).send("ToDo not found");
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error while creating ToDo:", error.message);
    return res.status(500).json(error.message);
  }
});

TodoRouter.delete("/:id", async (req, res) => {
  try {
    const response = await ToDoController.deleteTodo(req.params.id);
    return res.status(204).send();
  } catch (error) {
    console.error("Error while getting ToDo:", error.message);
    return res.status(500).json(error.message);
  }
});

export default TodoRouter;
