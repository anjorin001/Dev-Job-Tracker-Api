import dotenv from "dotenv";
dotenv.config(); 
import express, { Request, Response, NextFunction } from "express";
import { sendSuccess } from "./util/responseHandler";
import { client } from "./config/databaseConfig"; 
import morgan from "morgan";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT ?? 5000;

// Corrected route handler: (req, res)
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("Welcome to Dev Job Tracker");
  sendSuccess(res, "Welcome to Dev Jobs", 200);
});

app.use(errorHandler);

app.listen(PORT, async () => {
  await client.connect()
  console.log(`Server is live at port ${PORT}`);
});
