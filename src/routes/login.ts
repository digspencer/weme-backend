import { Router } from 'express';
import { LoginController } from '../controllers/Login';
import { authMiddleware } from '../middleware/authentication';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post("/", loginController.login)
loginRouter.get("/user", authMiddleware,loginController.getUserByToken)

export { loginRouter }; 