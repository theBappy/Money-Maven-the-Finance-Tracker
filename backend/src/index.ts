import "dotenv/config";
import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import { Env } from "./config/env-config";
import { HTTPSTATUS } from "./config/http-config";
import { errorHandler } from "./middleware/error-handler-middleware";
import { BadRequestException } from "./utils/app-error";
import { asyncHandler } from "./middleware/async-handler-middleware";
import { connectDB } from "./config/db-config";

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

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException("This is a test error");
    res.status(HTTPSTATUS.OK).json({
      message: "Hello World!",
    });
  })
);

app.use(errorHandler);

app.listen(Env.PORT, async() => {
  await connectDB();
  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
