import { Request, Response, NextFunction } from "express";
import { Error } from "../utils/errors/Error";
import { v4 as uuidv4 } from "uuid";
import { User } from "../entities/User";
import { API_URL } from "config";
import { validateRequestPayload } from "utils/validations";

/* --- Create User --- */
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = await User.getRepository();
    const userBody = req.body;
    /* Call the validation output here */
    const validateRequest = validateRequestPayload(req, res);
    /* check if we have any errors */
    if (validateRequest!.hasErrors) {
      return validateRequest!.errorBody;
    }

    const user = await userRepository.save(userBody);
    return user;
  } catch (error) {
    next(Error.internalServer((error as any).message));
    return;
  }
};

/* --- Get All users --- */
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = await User.getRepository();
    const { userId } = req.body;
    const user = await userRepository.findOne({ where: { userId: userId } });

    if (!user) {
      next(Error.notFound(`No user found with id: ${userId}`));
    }
  } catch (error) {
    next(Error.internalServer((error as any).message));
    return;
  }
};

/* --- Update user --- */
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = await User.getRepository();
    const  { firstName, lastName, id } = req.body;
    const user = await userRepository.createQueryBuilder()
        .update()
        .set({
            firstName,
            lastName
        })
        .where('id = :id', {id: id})
        .execute();
  } catch (error) {
    next(Error.internalServer((error as any).message));
    return;
  }
};
