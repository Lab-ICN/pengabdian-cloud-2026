import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  createUser,
  addRefreshToken,
  removeRefreshToken,
  findUserByRefreshToken,
  getUserRefreshTokens,
} from "../repositories/authRepository";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";
import HttpError from "../utils/HttpError";
import { Role } from "../types";

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  const user = await findUserByEmail(email);

  if (user) {
    throw new HttpError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({
    email,
    password: hashedPassword,
    name,
    role: Role.USER,
  });

  return loginUser(email, password);
};

export const loginUser = async (
  email: string,
  password: string,
  rememberMe: boolean = false
) => {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password as string)))
    throw new HttpError("Incorrect email or password", 401);

  const refreshToken = generateRefreshToken(user.id, rememberMe);

  const refreshTokens = await getUserRefreshTokens(user.id);
  if (refreshTokens.length >= 2) {
    await removeRefreshToken(refreshTokens[0].token);
  }

  await addRefreshToken(user.id, refreshToken);

  return {
    accessToken: generateAccessToken(user.id, user.name, user.email),
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);

  if (!user) throw new HttpError("Invalid refresh token", 403);

  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

    const newRefreshToken = generateRefreshToken(user.id);
    await removeRefreshToken(refreshToken);
    await addRefreshToken(user.id, newRefreshToken);

    return {
      accessToken: generateAccessToken(user.id, user.name, user.email),
      refreshToken: newRefreshToken,
    };
  } catch (err) {
    throw new HttpError("Invalid or expired refresh token", 403);
  }
};

export const logoutUser = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);
  if (!user) throw new HttpError("Invalid refresh token", 403);

  await removeRefreshToken(refreshToken);
};
