import { Client } from "pg";

export const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "DevJobTracker",
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});
