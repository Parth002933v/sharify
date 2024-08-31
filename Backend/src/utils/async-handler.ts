import { Request, Response, NextFunction } from "express";
import CustomError from "./error-object";

export const asyncHandler = <P = {}, ResBody = any, ReqBody = any, ReqQuery = any>(func: (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response, next: NextFunction) => {
        func(req, res, next).catch((err: CustomError) => next(err));
    };
};
