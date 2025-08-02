import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http-config";
import { asyncHandler } from "../middleware/async-handler-middleware";
import { LoginSchema, RegisterSchema } from "../validators/auth-validator";
import { LoginService, RegisterService } from "../services/auth-service";

export const RegisterController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = RegisterSchema.parse(req.body);
    const result = await RegisterService(body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully",
      data: result,
    });
  }
);
export const LoginController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = LoginSchema.parse({
      ...req.body,
    });

    const { user, accessToken, expiresAt, reportSetting } =
      await LoginService(body);

    return res.status(HTTPSTATUS.OK).json({
      message: "User logged in successfully",
      user,
      accessToken,
      expiresAt,
      reportSetting,
    });
  }
);
