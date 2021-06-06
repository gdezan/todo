import express, { Application } from "express";
import request from "supertest";

import TodoController from "../../controllers/todo";
import TodoRouter from "../todo";

const app: Application = express();
app.use(express.json());
app.use("/todos", TodoRouter);

describe("ToDo Router", () => {
  const mockTodo = {
    id: 1,
    title: "Todo Title",
    description: null,
    completed: false,
    createdAt: new Date("2021-06-06T00:00:00Z"),
    updatedAt: new Date("2021-06-06T00:00:00Z"),
  };

  const expectedTodo = {
    ...mockTodo,
    createdAt: "2021-06-06T00:00:00.000Z",
    updatedAt: "2021-06-06T00:00:00.000Z",
  };

  describe("GET /todos", () => {
    test("should return a list of all the ToDos", async () => {
      const mockedGetTodos = jest
        .spyOn(TodoController, "getTodos")
        .mockResolvedValueOnce([mockTodo]);

      const response = await request(app).get("/todos/");

      expect(mockedGetTodos).toBeCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual([expectedTodo]);
    });
  });

  describe("GET /todos/:id", () => {
    const mockedGetTodo = jest.spyOn(TodoController, "getTodo");

    test("should return a ToDo", async () => {
      mockedGetTodo.mockResolvedValueOnce(mockTodo);

      const response = await request(app).get("/todos/1");

      expect(mockedGetTodo).toBeCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedTodo);
    });

    test("should return 404 if no ToDo is found", async () => {
      mockedGetTodo.mockResolvedValueOnce(undefined);

      const response = await request(app).get("/todos/1");

      expect(mockedGetTodo).toBeCalled();
      expect(response.status).toBe(404);
    });
  });

  describe("POST /todos", () => {
    const mockedCreateTodo = jest.spyOn(TodoController, "createTodo");

    test("should return the created ToDo", async () => {
      mockedCreateTodo.mockResolvedValueOnce({
        ...mockTodo,
        title: "Created ToDo",
      });

      const response = await request(app)
        .post("/todos/")
        .send({ title: "Created ToDo" });

      expect(mockedCreateTodo).toBeCalledWith({ title: "Created ToDo" });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ ...expectedTodo, title: "Created ToDo" });
    });

    test("should not allow an empty title", async () => {
      const response = await request(app).post("/todos/").send({ title: "" });

      expect(mockedCreateTodo).not.toBeCalledWith();
      expect(response.status).toBe(400);
    });
  });

  describe("PUT /todos/:id", () => {
    const mockedUpdateTodo = jest.spyOn(TodoController, "updateTodo");
    test("should update a ToDo", async () => {
      mockedUpdateTodo.mockResolvedValueOnce({ ...mockTodo, completed: true });

      const response = await request(app)
        .put("/todos/1")
        .send({ completed: true });

      expect(mockedUpdateTodo).toBeCalledWith("1", { completed: true });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...expectedTodo, completed: true });
    });

    test("should return 404 if no ToDo is found", async () => {
      mockedUpdateTodo.mockResolvedValueOnce(null);

      const response = await request(app)
        .put("/todos/1")
        .send({ completed: true });

      expect(mockedUpdateTodo).toBeCalledWith("1", { completed: true });
      expect(response.status).toBe(404);
    });

    test("should not allow an empty title", async () => {
      const response = await request(app).put("/todos/1").send({ title: "" });

      expect(mockedUpdateTodo).not.toBeCalled();
      expect(response.status).toBe(400);
    });
  });

  describe("GET /todos", () => {
    test("should return a list of all the ToDos", async () => {
      const mockedGetTodos = jest
        .spyOn(TodoController, "getTodos")
        .mockResolvedValueOnce([mockTodo]);

      const response = await request(app).get("/todos/");

      expect(mockedGetTodos).toBeCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual([expectedTodo]);
    });
  });

  describe("DELETE /todos/:id", () => {
    const mockedDeleteTodo = jest.spyOn(TodoController, "deleteTodo");

    test("should return a ToDo", async () => {
      mockedDeleteTodo.mockResolvedValueOnce(null);

      const response = await request(app).delete("/todos/1");

      expect(mockedDeleteTodo).toBeCalled();
      expect(response.status).toBe(204);
    });
  });
});
