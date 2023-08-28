import { Request, Response } from 'express';
import { UserService } from '../../services/User';


export class UserController {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    
    try {
      const user = await this.userService.createUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  getUsers = async (req: Request, res: Response): Promise<void> => {    
    try {
      const users = await this.userService.getAll();
      res.status(201).json(users);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}



