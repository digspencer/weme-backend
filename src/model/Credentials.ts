type TypeCredential = "EMAIL" | "CREDIT_CARD"

export interface CredentialsType {
    id: string;
    type: TypeCredential;
    userId: string;
    title: string;
    site?: string;
    email?: string;
    password?: string;
    name?: string;
    cardNumber?: string;
    code?: string;
    expirantionDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type CredentialProps = Omit<CredentialsType, "id" | "createdAt" | "updatedAt">;
