import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskIn } from './create-task.in.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../../enum/task-status.enum';

export class UpdateTaskIn extends PartialType(CreateTaskIn) {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
