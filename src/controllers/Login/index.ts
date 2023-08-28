import { Request, Response } from 'express';
import { LoginService } from '../../services/Login'

export class LoginController {
    private loginService = new LoginService();

    login = async (req: Request, res: Response): Promise<void> => {
      const { email, password } = req.body;

      try {
        const token = await this.loginService.authenticateUser(email, password);

        if (!token) {
          res.status(401).json({ message: 'Invalid credentials' });
          return;
        }

        res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        res.status(500).json({ message: 'Error during login' });
      }
    }

    getUserByToken = async (req: Request & { user: {} }, res: Response): Promise<void> => {
      if(req?.user) {
        res.status(203).json(req.user);
      } else {
        res.status(500).json({ message: 'User not found.' });
      }
    }
}