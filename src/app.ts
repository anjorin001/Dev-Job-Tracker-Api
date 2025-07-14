import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { sendSuccess } from "./util/responseHandler";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT ?? 5000;

// Corrected route handler: (req, res)
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("Welcome to Dev Job Tracker");
  sendSuccess(res, "Welcome to Dev Jobs", 200);
});

// Corrected listen with port
app.listen(PORT, () => {
  console.log(`Server is live at port ${PORT}`);
});
