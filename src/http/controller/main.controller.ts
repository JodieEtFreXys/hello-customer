import { NextFunction, Request, Response } from "express";
import { mainService } from "../service/main.service";

class MainController {
    private service = mainService;

    public async findHello(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const hellos = await this.service.findHello();

            res.status(200).json({
                message: "Hello fellow customer, are you already registered?",
                customers: hellos,
            });

            next();
        } catch (error: any) {
            let err: string[] = error.message.split('#');
            console.log(error);
            res.status(Number(err[1]) || 500).json({
                message: err[0] || 'Internal server error',
            });
        }
    }

    public async findHelloById(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const hello = await this.service.findHelloById(Number(req.params.id) || 0);

            res.status(200).json({
                message: hello.favorite_item
                    ? `Hello ${hello.name} would you like to order ${hello.favorite_item} again?`
                    : `Hello ${hello.name} it seems you are new here since you dont have a favorite item, what would you like to order?`,
                customers: hello,
            });
            
            next();
        } catch (error: any) {
            let err: string[] = error.message.split('#');
            res.status(Number(err[1]) || 500).json({
                message: err[0] || 'Internal server error',
            });
        }
    }

    public async createHello(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            if (!req.body?.name) {
                throw new Error('Name is mandatory#400');
            }

            if (typeof(req.body.name) !== 'string') {
                throw new Error('Name must be a string#400');
            }

            if (req.body?.favorite_item && typeof(req.body.favorite_item) !== 'string') {
                throw new Error('Favorite item must be a string#400');
            }

            const createHello = await this.service.createCustomer(req.body.name, req.body.favorite_item);

            res.status(200).json({
                message: "Create success!",
                meta: createHello,
            });
        } catch (error: any) {
            const err: string[] = error.message.split('#');
            res.status(Number(err[1]) || 500).json({
                message: err[0] || 'Internal server error',
            });
        }
    }

    public async updateFavoriteItem(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            if (!req.params?.id) {
                throw new Error('Id is mandatory#400');
            }

            if (typeof(req.params.id) !== 'string') {
                throw new Error('Id must be a string#400');
            }

            if (!req.body?.favorite_item) {
                throw new Error('Favorite item is mandatory#400');
            }

            if (typeof(req.body.favorite_item) !== 'string') {
                throw new Error('Favorite item must be a string#400');
            }

            const patchFavoriteItem = await this.service.patchFavoriteItem(Number(req.params.id), req.body.favorite_item);

            if (!patchFavoriteItem) {
                throw new Error('Something wrong#500');
            }
            
            res.status(200).json({
                message: "Update success!",
                meta: patchFavoriteItem,
            });
        } catch (error: any) {
            const err: string[] = error.message.split('#');
            res.status(Number(err[1]) || 500).json({
                message: err[0] || 'Internal server error',
            });
        }
    }
}

export const mainController = new MainController();