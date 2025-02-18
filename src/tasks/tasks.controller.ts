import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from 'src/dtos/tasks/create-task.dto';
import { Status, Task } from 'src/entities/task.entity';
import { UpdateTaskDTO } from 'src/dtos/tasks/update-task.dto';
import { CompleteTaskDTO } from 'src/dtos/tasks/complete-task.dto';

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

    @Patch('/:id/:status')
    completeTask(@Param("id", ParseIntPipe) id: number,@Param("status") status: Status, @Body() task: CompleteTaskDTO){
        return this.taskService.completeTask(id, status, task).then(task => {
            return task;
        }).catch(error => {
            throw error;
        });
    }

        @Get('/personal/:id')
        async getPersonalTasks(@Param('id', ParseIntPipe)id: number) {
            try{
                const tasks = await this.taskService.getPersonalTasks(id);
                return tasks;
            }catch(Error){
                throw new HttpException('Group not found',404);
            }
        }

}
