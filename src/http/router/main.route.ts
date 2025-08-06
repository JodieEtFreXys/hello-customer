import { NextFunction, Request, Response, Router } from "express";
import { mainController } from "../controller/main.controller";

const router: Router = Router();

router.get(
    '/customer',
    (req: Request, res: Response, next: NextFunction) => mainController.findHello(req, res, next),
);

router.get(
    '/customer/:id',
    (req: Request, res: Response, next: NextFunction) => mainController.findHelloById(req, res, next),
)

router.post(
    '/customer',
    (req: Request, res: Response, next: NextFunction) => mainController.createHello(req, res, next),
)

router.patch(
    '/customer/:id/fav_item',
    (req: Request, res: Response, next: NextFunction) => mainController.updateFavoriteItem(req, res, next),
)

export default router;