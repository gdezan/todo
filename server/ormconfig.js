const DbDevConfig = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  entities: ["./src/models/*.ts"],
  synchronize: true,
  logging: true,
  migrations: ["./src/migrations/*.ts"],
  migrationsTableName: "migrations",
  cli: {
    migrationsDir: "./src/migrations",
  },
};

const DbProdConfig = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ["./build/models/*.js"],
  synchronize: false,
  logging: false,
};

const OrmConfig =
  process.env.NODE_ENV === "production" ? DbProdConfig : DbDevConfig;

module.exports = OrmConfig;
