import { CredentialProps, CredentialsType } from '../../model/Credentials';
import { CrendentialsRepository } from '../../repository/CredentialsRepository';
import { validateKeysOnObject } from '../../utils/hasProperties';

export class CredentialsService { 
    private credentialsRepository = new CrendentialsRepository();
  
    create = async (credentialProps: CredentialProps): Promise<CredentialsType> => {
      this.isValidToCreate(credentialProps);
      const { title, userId } = credentialProps;

      const hasTitle = await this.credentialsRepository.hasTitleByUserId(userId, title);
      if(hasTitle) throw new Error("Title already exists.");

      const credentials = await this.credentialsRepository.create(credentialProps);

      return credentials;
    }
  
    getByUserId = async (id: string): Promise<CredentialsType[]> => {
      return this.credentialsRepository.findByUserId(id);
    }

    updateCredential = async (credential: CredentialsType): Promise<CredentialsType[]> => {
      this.isValidToUpdate(credential);
      const credentials = await this.credentialsRepository.updateCredential(credential);
      return credentials;
    }

    private isValidToUpdate(credential: CredentialsType) {
      const hasCredential = this.credentialsRepository.findByCredentialId(credential.id);
      if(!hasCredential) throw new Error('Creditial not exists.');
      
      const requiredFields = ['id', 'type', 'userId', 'title', 'createdAt', 'updatedAt'];
      const hasAllKeys = validateKeysOnObject(credential, requiredFields);
      if(!hasAllKeys) throw new Error("Creditial has not all properties.");
    }

    private isValidToCreate(credential: CredentialProps) {
      if(!credential) throw new Error("Invalid credential payload.");
      
      if(!credential?.type) throw new Error("Invalid credential type.");
      
      const requiredFields = credential.type === "EMAIL" ? ['type', 'title', 'email', 'password', 'site']
        : ["name", "numberCard", "code", "expirationDate", "title", "password", "type"];

      const hasAllKeys = validateKeysOnObject(credential, requiredFields);
      if(!hasAllKeys) throw new Error("Creditial has not all properties.");
    }
}