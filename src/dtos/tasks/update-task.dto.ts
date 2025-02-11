import { Status } from "src/entities/task.entity";

export class UpdateTaskDTO {
    title?: string;
    description?: string;
    location?: string;
    status?: Status;
}