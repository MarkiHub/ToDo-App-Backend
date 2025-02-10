import { Group } from 'src/groups/group.entity';
import { Task } from 'src/tasks/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    password: string;

    @Column()
    icon: string;

    @Column()
    code: string;

    @OneToMany(() => Task, task => task.author)
    tasks: Task[];

    @OneToMany(() => Task, task => task.doneBy)
    tasksDone: Task[];

    @OneToMany(() => Group, group => group.admin)
    adminOn: Group[];
}