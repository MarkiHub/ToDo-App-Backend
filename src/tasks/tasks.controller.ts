import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from 'src/dtos/tasks/create-task.dto';
import { Status, Task } from 'src/entities/task.entity';
import { UpdateTaskDTO } from 'src/dtos/tasks/update-task.dto';
import { CompleteTaskDTO } from 'src/dtos/tasks/complete-task.dto';
import { Request } from 'express';

@Controller('tasks')
export class TasksController {

    constructor(
        private taskService: TasksService
    ){}

    @Post()
    createTask(@Body() newTask: CreateTaskDTO, @Req() req: Request): Promise<Task> {
        const user = (req as any).user ;
        return this.taskService.createTask(newTask, user).then(task => {
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

    @Get('/personal')
    async getPersonalTasks(@Req() req: Request) {
        const user = (req as any).user ;
        try {
            const tasks = await this.taskService.getPersonalTasks(user);
            return tasks;
        } catch (Error) {
            throw new HttpException('Group not found', 404);
        }
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

    @Patch('/:id/:status')
    completeTask(@Param("id", ParseIntPipe) id: number,@Param("status") status: Status, @Body() task: CompleteTaskDTO){
        return this.taskService.completeTask(id, status, task).then(task => {
            return task;
        }).catch(error => {
            throw error;
        });
    }
}
