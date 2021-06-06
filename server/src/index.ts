import express, { Application } from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";

import TodoRouter from "./routes/todo";

async function main() {
  const PORT = process.env.PORT || 8000;

  const app: Application = express();

  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(express.static("public"));
  app.use(express.urlencoded());

  app.use("/todos", TodoRouter);

  try {
    await createConnection();
    console.log("Connected succesfully to the database");
  } catch (error) {
    console.error("Error while connecting to the database", error.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}

main();
