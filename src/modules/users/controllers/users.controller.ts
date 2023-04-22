import { NextFunction, Request, Response } from "express";
import UserService from "@modules/users/services/users.service";
import { User } from "@modules/users/models/users.model";
import { GenericController } from "@generic/models/generic.model";

class UsersController implements GenericController {
  public userService = new UserService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getEntities: User[] = await this.userService.getEntities();

      res.status(200).json({ data: getEntities, message: "getEntities" });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData = {
        params: {
          resourceId: req.params.id,
        },
      };
      const getEntityById: User = await this.userService.getEntityById(requestData);

      res.status(200).json({ data: getEntityById, message: "getEntityById" });
    } catch (error) {
      next(error);
    }
  };

  public patch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData = {
        params: {
          resourceId: req.params.id,
        },
        data: req.body,
      };

      const patchEntity: User = await this.userService.patchEntity(requestData);

      res.status(200).json({ data: patchEntity, message: "patchEntity" });
    } catch (error) {
      next(error);
    }
  };

  public put = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData = {
        params: {
          resourceId: req.params.id,
        },
        data: req.body,
      };

      const putEntity: User = await this.userService.putEntity(requestData);

      res.status(200).json({ data: putEntity, message: "putEntity" });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData = {
        params: {
          resourceId: req.params.id,
        },
      };
      await this.userService.deleteEntity(requestData);

      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
