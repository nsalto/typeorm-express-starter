import { Request, Response, NextFunction } from "express";
import { Error } from "../utils/errors/Error";
import { User } from "../entities/User";
import { Auth } from "../auth/index";
import { compare } from "bcryptjs";
import { verify } from "jsonwebtoken";

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const userRepository = await User.getRepository();
  const user = await userRepository.findOne({ where: { email: email } });
  /* Check if user is finded */
  if (!user) {
    next(
      Error.badRequest(
        "The Username or Password is Incorrect!"
      )
    );
    return;
  }
  /* If user is finded check the password */
  const valid = await compare(password, user.password);
  /* Check if the password  is valid */
  if (!valid) {
    next(
      Error.badRequest(
        "The Username or Password is Incorrect!"
      )
    );
    return;
  }

  const auth = new Auth();
  /* Pass Refresh Token to httpOnly cookie */
  res.cookie("ssid", auth.createRefreshToken(user), { httpOnly: true });

  /* if login is successful return token */
  return {
    accessToken: auth.createAccessToken(user!),
  };
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authPayload: any;
  const refreshTokenSecrete = process.env.REFRESH_TOKEN_SECRETE;
  const refreshToken = req.cookies.ssid;
  const userRepository = await User.getRepository();
  if (!refreshToken) {
    next(Error.unauthorized("Unauthroized: Please login to continue."));
    return;
  }
  verify(refreshToken, refreshTokenSecrete!, (err: any, payload: any) => {
    /* asign atuh payload */
    authPayload = payload;

    if (err) {
      next(Error.unauthorized("Unauthroized: Please login to continue!"));
      return;
    }
  });

  /* Get the user using the userId in the payload */
  const user = await userRepository.findOne({
    where: { userId: authPayload.userId },
  });
  const auth = new Auth();

  /* Pass Refresh Token to httpOnly cookie */
  res.cookie("ssid", auth.createRefreshToken(user!), { httpOnly: true });

  /* if login is successful return token */
  return {
    accessToken: auth.createAccessToken(user!),
  };
};

const signOut = async (req: Request, res: Response, next: NextFunction) => {
  /* Delete the refresh token in the httpOnly cookie */
  res.clearCookie("ssid");
  return null;
};

export { signIn, signOut, refreshToken};