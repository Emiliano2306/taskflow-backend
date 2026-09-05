import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskRepository } from '../repository/task.repository';
import { TaskOut } from '../dto/out/task.out.dto';
import { Task } from '../schema/task.schema';
import { CreateTaskIn } from '../dto/in/create-task.in.dto';
import { UpdateTaskIn } from '../dto/in/update-task.in.dto';

@Injectable()
export class taskServiceImpl implements TaskService {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
  ) {}

  async create(createData: CreateTaskIn): Promise<TaskOut> {
    return await this.taskRepository.create(createData);
  }

  async findAll(): Promise<TaskOut[]> {
    return await this.taskRepository.findAll();
  }

  async findById(id: string): Promise<TaskOut> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, changes: UpdateTaskIn): Promise<TaskOut | null> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return await this.taskRepository.update(id, changes);
  }

  async softDelete(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return await this.taskRepository.softDelete(id);
  }
}
