import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task, TaskDocument } from '../schema/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TaskOut } from '../dto/out/task.out.dto';

@Injectable()
export class TaskMongoRepository implements TaskRepository {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createData: Partial<Task>): Promise<TaskOut> {
    const createdTask = new this.taskModel(createData);
    const savedTask = await createdTask.save();
    return this.parseOut(savedTask);
  }

  async findAll(): Promise<TaskOut[]> {
    const taskList = await this.taskModel.find({ deletedAt: null }).exec();
    return taskList.map((task) => this.parseOut(task));
  }

  async findById(id: string): Promise<TaskOut | null> {
    const task = await this.taskModel
      .findOne({ _id: id, deletedAt: null })
      .exec();
    return task ? this.parseOut(task) : null;
  }

  async update(id: string, changes: Partial<Task>): Promise<TaskOut | null> {
    const updatedTask = await this.taskModel
      .findOneAndUpdate({ _id: id, deletedAt: null }, changes, { new: true })
      .exec();
    return updatedTask ? this.parseOut(updatedTask) : null;
  }

  async softDelete(id: string): Promise<void> {
    await this.taskModel
      .findOneAndUpdate({ _id: id, deletedAt: null }, { deletedAt: new Date() })
      .exec();
  }

  private parseOut(task: TaskDocument): TaskOut {
    return {
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      tags: task.tags,
      dueDate: task.dueDate,
      userId: task.userId?.toString(),
      deletedAt: task.deletedAt,
    };
  }
}
