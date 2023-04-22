import { NextFunction, Request, Response } from "express";

export interface DocumentResult<T> {
  _doc: T;
}

export interface RequestData {
  params?: {
    resourceId: string;
    [key: string]: string;
  };
  data?: Record<string, any>;
}

export interface GenericService<RequestData = any> {
  getEntities?(requestData: RequestData): Promise<any>;
  getEntityById?(requestData: RequestData): Promise<any>;
  postEntity?(requestData: RequestData): Promise<any>;
  putEntity?(requestData: RequestData): Promise<any>;
  patchEntity?(requestData: RequestData): Promise<any>;
  deleteEntity?(requestData: RequestData): Promise<any>;
}

export interface GenericController {
  getAll?(req: Request, res: Response, next: NextFunction): void;
  getById?(req: Request, res: Response, next: NextFunction): void;
  post?(req: Request, res: Response, next: NextFunction): void;
  put?(req: Request, res: Response, next: NextFunction): void;
  patch?(req: Request, res: Response, next: NextFunction): void;
  delete?(req: Request, res: Response, next: NextFunction): void;
}
