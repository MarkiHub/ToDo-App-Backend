import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    description: string;

    @ManyToOne(() => User, user => user.tasks)
    admin: User;

    @ManyToMany(() => User)
    @JoinTable()
    members: User[];

    @OneToMany(() => Task, task => task.group)
    tasks: Task[];

}