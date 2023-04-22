import { Router } from "express";
import UsersController from "@modules/users/controllers/users.controller";
import { Routes } from "@generic/interfaces/routes.interface";
import { checkToken } from "@/middlewares/checkToken.middleware";

class UsersRoute implements Routes {
  public path = "/users";
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, checkToken, this.usersController.getAll);
    this.router.get(`${this.path}/:id`, checkToken, this.usersController.getById);
    this.router.put(`${this.path}/:id`, checkToken, this.usersController.put);
    this.router.patch(`${this.path}/:id`, checkToken, this.usersController.patch);
    this.router.delete(`${this.path}/:id`, checkToken, this.usersController.delete);
  }
}

export default UsersRoute;
