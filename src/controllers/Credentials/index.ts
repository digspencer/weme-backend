import { Request, Response } from 'express';
import { CredentialsService } from '../../services/Credentials';
import { CredentialsType } from '../../model/Credentials';
import { User } from '../../model/User';


export class CredentialController {
  credentialService = new CredentialsService();

  create = async (req: Request<{},{}, { credential: CredentialsType }> & { user: User }, res: Response): Promise<void> => {
    const { credential } = req.body;
    const user = req.user;
    
    try {
      const credentialCreated = await this.credentialService.create({...credential, userId: user.id});
      res.status(201).json(credentialCreated);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  getCredentials = async (req: Request & { user: User }, res: Response): Promise<void> => {    
    try {
      const credentials = await this.credentialService.getByUserId(req.user.id);
      res.status(201).json(credentials);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  updateCredential = async (req: Request & { user: User }, res: Response): Promise<void> => {
    const { credential } = req.body;    

    try {
      const credentials = await this.credentialService.updateCredential(credential);
      res.status(201).json(credentials);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}



