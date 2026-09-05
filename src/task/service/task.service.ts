import { TaskOut } from '../dto/out/task.out.dto';
import { CreateTaskIn } from '../dto/in/create-task.in.dto';
import { UpdateTaskIn } from '../dto/in/update-task.in.dto';

export interface TaskService {
  create(createData: CreateTaskIn): Promise<TaskOut>;
  findAll(): Promise<TaskOut[]>;
  findById(id: string): Promise<TaskOut>;
  update(id: string, changes: UpdateTaskIn): Promise<TaskOut | null>;
  softDelete(id: string): Promise<void>;
}
