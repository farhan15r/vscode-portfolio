import { Pool } from "pg";
import config from "./config";

const pool = new Pool({
  host: config.POSTGRES_HOST,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  port: config.POSTGRES_PORT,
  database: config.POSTGRES_DB,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
