import { Router } from 'express';
import { authMiddleware } from '../middleware/authentication';
import { CredentialController } from '../controllers/Credentials';

const credentialsRouter = Router();
const credentialController = new CredentialController();

credentialsRouter.get("/", authMiddleware, credentialController.getCredentials);
credentialsRouter.post("/", authMiddleware, credentialController.create);
credentialsRouter.put("/", authMiddleware, credentialController.updateCredential);

export { credentialsRouter };