import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../modules/users/user.entity";
import { Job } from "../modules/job/job.entitty";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  database: "DevJobTracker",
  synchronize: true, // turn off in production
  logging: false,
  entities: [User, Job],
  migrations: [],
  subscribers: [],
});
