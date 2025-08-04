import "dotenv/config";
import "./config/passport-config";
import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import { Env } from "./config/env-config";
import { HTTPSTATUS } from "./config/http-config";
import { errorHandler } from "./middleware/error-handler-middleware";
import { BadRequestException } from "./utils/app-error";
import { asyncHandler } from "./middleware/async-handler-middleware";
import { connectDB } from "./config/db-config";
import authRoutes from "./routes/auth-routes";
import passport from "passport";
import userRoutes from "./routes/user-routes";
import { passportAuthenticateJwt } from "./config/passport-config";
import transactionRoutes from "./routes/transactin-routes";
import { initializeCrons } from "./cron";
import reportRoutes from "./routes/report-routes";

const app = express();
const BASE_PATH = Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

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

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, passportAuthenticateJwt, userRoutes);
app.use(`${BASE_PATH}/transaction`, passportAuthenticateJwt, transactionRoutes);
app.use(`${BASE_PATH}/report`, passportAuthenticateJwt, reportRoutes);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connectDB();
  if (Env.NODE_ENV === `development`) {
    await initializeCrons();
  }
  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
