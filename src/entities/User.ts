import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Credentials } from './Credentials';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({ unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    actived: boolean;

    @OneToMany(() => Credentials, credential => credential.user)
    @JoinColumn({ name: 'credentialId' })
    credentials: Credentials[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}