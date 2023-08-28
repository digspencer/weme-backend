import { User } from '../../model/User';
import { UserRepository } from '../../repository/UserRepository';
import * as bcrypt from 'bcrypt';

export class UserService { 
    private userRepository = new UserRepository();
  
    createUser = async (name: string, email: string, password: string): Promise<Omit<User, "password">> => {
      const hasEmail = await this.getByEmail(email);

      if(hasEmail) throw new Error("Email already exist.");

      const hashedPassword = await bcrypt.hash(password, 10);
      const { password: deletedPassword, ...user } = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      return user;
    }
  
    getByEmail = async (email: string): Promise<User | undefined> => {
      return this.userRepository.findByEmail(email);
    }

    getAll = async (): Promise<string[]> => {
      const users = await this.userRepository.find();
      return users.map(user => user.email);
    }
}