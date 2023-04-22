import { NextFunction, Request, Response } from "express";
import { User } from "@modules/users/models/users.model";
import AuthService from "../services/authentication.service";
import { GenericController } from "@generic/models/generic.model";

class AuthController implements GenericController {
  public authService = new AuthService();

  public post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData = {
        data: req.body,
      };

      const registerUser = await this.authService.postEntity(requestData);

      res.status(200).json({ data: registerUser, message: "register" });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData = {
        data: req.body,
      };

      const loginUser: User = await this.authService.getEntityById(requestData);

      res.status(200).json({ data: loginUser, message: "login" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
