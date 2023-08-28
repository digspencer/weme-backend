import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../../repository/UserRepository';
import * as bcrypt from 'bcrypt';
import { JWT_SECRET } from '../../config/env';

export class LoginService {
  private userRepository = new UserRepository();

  authenticateUser = async (email: string, password: string): Promise<string | null> => {
    
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
        return null;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        return null; 
    }
    
    const token = jwt.sign({ 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        createdAt: user.createdAt, 
        updatedAt: user.updatedAt, 
      }, JWT_SECRET, { expiresIn: '1d' });

    return token;
  }
}