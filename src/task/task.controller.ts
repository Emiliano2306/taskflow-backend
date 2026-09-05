import { CreateTaskIn } from './dto/in/create-task.in.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './service/task.service';
import { TaskOut } from './dto/out/task.out.dto';
import { UpdateTaskIn } from './dto/in/update-task.in.dto';

@Controller('tasks')
export class TaskController {
  constructor(
    @Inject('TaskService') private readonly taskService: TaskService,
  ) {}

  @Post()
  create(@Body() createData: CreateTaskIn): Promise<TaskOut> {
    return this.taskService.create(createData);
  }

  @Get()
  findAll(): Promise<TaskOut[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<TaskOut> {
    return this.taskService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: UpdateTaskIn,
  ): Promise<TaskOut | null> {
    return this.taskService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.taskService.softDelete(id);
  }
}
