import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Credentials {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    type: string;

    @Column()
    site: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    title: string;

    @Column()
    cardNumber: string;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    expirationDate: Date;

    @ManyToOne(() => User, user => user.credentials)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}