import { Status } from "src/entities/task.entity";

export class CreateTaskDTO {
    title: string;
    description: string;
    location?: string;
    authorId: number;
    status?: Status;
    doneById?: number;
    groupId ?: number;
}