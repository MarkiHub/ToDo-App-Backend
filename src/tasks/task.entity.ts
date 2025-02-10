import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum Status {
    DONE = 'done',
    PENDING = 'pending'
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;
    
    @Column()
    location: string;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.tasks)
    author: User;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING
    })
    status: Status;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    hour: Date;

    @ManyToOne(() => User, user => user.tasksDone)
    doneBy: User;
}