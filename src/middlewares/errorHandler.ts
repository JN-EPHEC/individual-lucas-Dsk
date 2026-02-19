import type { Request, Response} from "express";

export const errorHandler = (err: any, req: Request, res: Response) => {
    console.error(err);

    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    return res.status(status).json(message)

   
};