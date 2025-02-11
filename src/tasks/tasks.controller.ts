import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from 'src/dtos/tasks/create-task.dto';
import { Task } from 'src/entities/task.entity';
import { UpdateTaskDTO } from 'src/dtos/tasks/update-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(
        private taskService: TasksService
    ){}

    @Post()
    createTask(@Body() newTask: CreateTaskDTO): Promise<Task> {
        return this.taskService.createTask(newTask).then(task => {
            return task;
        }).catch(error => {
            throw error; 
        });
    }

    @Get()
    getTasks(): Promise<Task[]> {
        return this.taskService.getTasks().then(tasks => {
            return tasks;
        }).catch(error => {
            throw error;
        });
    }

    @Get(':id')
    getTaskById(id: number){
        return this.taskService.getTaskById(id).then(task => {
            return task;
        }).catch(error => {
            throw error;
        });
    }

    @Patch(':id')
    updateTask(@Param("id", ParseIntPipe) id: number, @Body() task: UpdateTaskDTO){
        return this.taskService.updateTask(id, task).then(task => {
            return task;
        }).catch(error => {
            throw error;
        });
    }

    @Delete(':id')
    deleteTask(@Param("id", ParseIntPipe) id: number){
        return this.taskService.deleteTask(id).then(task => {
            return task;
        }).catch(error => {
            throw error;
        });
    }

    

}
