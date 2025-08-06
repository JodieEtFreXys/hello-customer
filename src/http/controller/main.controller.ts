import { NextFunction, Request, Response } from "express";

interface ErrorSampler {
    message: string;
    code: number;
}

class MainController {
    public async findHello(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            // const hellos = 
        } catch (error: unknown) {
            const err = error as ErrorSampler;
            res.status(err.code || 500).json({
                message: err.message || 'Internal server error',
            });
        }
    }
}