import { v4 as uuidv4 } from 'uuid';
import { CredentialProps, CredentialsType } from '../model/Credentials';


interface CredentialsRepositoryType {
    find: () => Promise<CredentialsType[]>;
    create: (user: CredentialProps) => Promise<CredentialsType>;
    findByUserId: (id: string) => Promise<CredentialsType[]>;
    hasTitleByUserId: (userId: string, title: string) => Promise<boolean>
    updateCredential: (credential: CredentialsType) => Promise<CredentialsType[]>
}

const credentials: CredentialsType[] = [];
export class CrendentialsRepository implements CredentialsRepositoryType {

    find = async (): Promise<CredentialsType[]> => {
        return Promise.resolve(credentials);
    }

    create = async (credentialsProps: CredentialProps): Promise<CredentialsType> => {
        const newCredential = {
            id: uuidv4(),
            ...credentialsProps,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        credentials.push(newCredential);
        return Promise.resolve(newCredential);
    }
    
    findByUserId = async (userId: string): Promise<CredentialsType[]> => {
        const credentialsFilted = credentials.filter(credentialsFilter => credentialsFilter.userId === userId);
        return Promise.resolve(credentialsFilted);
    }

    findByCredentialId = async (credentialId: string): Promise<CredentialsType> => {
        const credentialsFilted = credentials.find(credentialsFilter => credentialsFilter.id === credentialId);
        return Promise.resolve(credentialsFilted);
    }

    hasTitleByUserId = async (userId: string, title: string): Promise<boolean> => {
        const credentialsFilted = await this.findByUserId(userId);
        const hasTitle = credentialsFilted.some(credential => credential.title === title);

        return Promise.resolve(hasTitle);
    }

    updateCredential = async (credential: CredentialsType): Promise<CredentialsType[]> => {
        const indexCredential = credentials.findIndex(cred => cred.id === credential.id)
        credentials[indexCredential] = credential;
        return Promise.resolve(credentials);
    }

}