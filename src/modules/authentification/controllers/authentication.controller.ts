import { NextFunction, Request, Response } from "express";
import { User } from "@modules/users/models/users.model";
import AuthService from "../services/authentication.service";

class AuthController {
  public authService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registerUser = await this.authService.register(req.body);

      res.status(200).json({ data: registerUser, message: "register" });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginUser: User = await this.authService.login(req.body);

      res.status(200).json({ data: loginUser, message: "login" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
