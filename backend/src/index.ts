import "dotenv/config";
import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import { Env } from "./config/env-config";
import { HTTPSTATUS } from "./config/http-config";

const app = express();
const BASE_PATH = Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(HTTPSTATUS.OK).json({
    message: "Hello World from the Money Maven-the ultimate finance tracker!",
  });
});

app.listen(Env.PORT, () => {
    console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`)
})
