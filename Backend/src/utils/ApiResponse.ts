
import { Request, Response, NextFunction } from "express";

interface SendResponseParams {
    res: Response;
    statusCode: number;
    message: string;
    data?: any;
}
export const SendResponse = ({
    res,
    statusCode,
    message,
    data,
}: SendResponseParams) => {
    res.status(statusCode).json({
        statusCode: statusCode,
        message: message,
        data: data,
    });
};
