import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Env } from "../config/env-config";

type TimeUnit = "s" | "m" | "h" | "d" | "w" | "y";
type TimeString = `${number}${TimeUnit}`;

export type AccessTokenPayload = {
  userId: string;
};

type SignOptsAndSecret = SignOptions & {
  secret: string;
  expiresIn?: TimeString | number;
};

const defaults: SignOptions = {
  audience: ["user"],
};

const accessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: Env.JWT_EXPIRES_IN as TimeString,
  secret: Env.JWT_SECRET,
};

export const signJwtToken = (
  payload: AccessTokenPayload,
  options?: SignOptsAndSecret
) => {
  const isAccessToken = !options;
  const { secret, ...opts } = options || accessTokenSignOptions;

  const token = jwt.sign(payload, secret, {
    ...defaults,
    ...opts,
  });

  let expiresAt: number | undefined = undefined;

  if (isAccessToken) {
    const decoded = jwt.decode(token) as JwtPayload | null;
    if (decoded?.exp) {
      expiresAt = decoded.exp * 1000;
    }
  }

  return {
    token,
    expiresAt,
  };
};
