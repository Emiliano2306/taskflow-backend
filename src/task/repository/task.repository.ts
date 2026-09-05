import { TaskOut } from '../dto/out/task.out.dto';
import { Task } from '../schema/task.schema';

export interface TaskRepository {
  create(createData: Partial<Task>): Promise<TaskOut>;
  findAll(): Promise<TaskOut[]>;
  findById(id: string): Promise<TaskOut | null>;
  update(id: string, changes: Partial<Task>): Promise<TaskOut | null>;
  softDelete(id: string): Promise<void>;
}
