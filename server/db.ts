import { ConnectionOptions } from "typeorm";

import { ToDo } from "./src/models/todo";

const DbConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [ToDo],
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  migrations: ["../migrations/*.ts"],
  migrationsTableName: "migrations",
};

export default DbConfig;
