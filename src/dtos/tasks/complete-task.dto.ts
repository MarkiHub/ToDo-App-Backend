import { Status } from "src/entities/task.entity";

export class CompleteTaskDTO {
    status: Status;
    doneById: number;
}