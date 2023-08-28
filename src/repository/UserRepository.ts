import { v4 as uuidv4 } from 'uuid';
import { User } from '../model/User';

interface UserProps {
    email: string;
    name: string;
    password: string;
}

interface UserRepositoryType {
    find: () => Promise<User[]>;
    create: (user: UserProps) => Promise<User>;
    findByEmail: (email: string) => Promise<User>;
    findById: (id: string) => Promise<User>;
}

const users: User[] = [];
export class UserRepository implements UserRepositoryType {

    find = async (): Promise<User[]> => {
        return Promise.resolve(users);
    }

    create = async ({ email, name, password }: UserProps): Promise<User> => {
        const newUser = {
            id: uuidv4(),
            email,
            name,
            password,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        users.push(newUser);
        return Promise.resolve(newUser);
    }
    
    findByEmail = async (email: string): Promise<User> => {
        const user = users.find(userFinded => userFinded.email === email);
        return Promise.resolve(user);
    }

    findById = async (id: string): Promise<User> => {
        const user = users.find(userFinded => userFinded.id === id);
        return Promise.resolve(user);
    }

}