import { Group } from 'src/entities/group.entity';
import { Task } from 'src/entities/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import { generateUniqueCode } from 'src/utils/generateCode';

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

    @BeforeInsert()
    generateCode() {
        this.code = generateUniqueCode(this.name);
    }
}