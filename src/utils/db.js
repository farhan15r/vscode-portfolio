import { Pool } from "pg";
import config from "./config";

const pool = new Pool({
  host: config.POSTGRES_HOST,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  port: config.POSTGRES_PORT,
  database: config.POSTGRES_DB,
  ssl: Boolean(config.POSTGRES_SSL_MODE.toLocaleLowerCase() === "true"),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export default pool;
