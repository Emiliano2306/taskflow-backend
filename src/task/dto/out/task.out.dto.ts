import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { TaskStatus } from '../../enum/task-status.enum';
import { TaskDocument } from '../../schema/task.schema';
import { Types } from 'mongoose';

export class TaskOut {
  @ApiProperty({ example: '65f1a2b3c4d5e6f7a8b9c0d1' })
  @Expose()
  @Transform(({ obj }: { obj: TaskDocument }) => obj._id?.toString())
  id: string;

  @ApiProperty({ example: 'Completar documentación' })
  @Expose()
  title: string;

  @ApiPropertyOptional({ example: 'Detalle de la tarea...' })
  @Expose()
  description?: string;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.TODO })
  @Expose()
  status: TaskStatus;

  @ApiPropertyOptional({ example: ['nestjs', 'mongodb'] })
  @Expose()
  tags?: string[];

  @ApiPropertyOptional({ example: '2026-09-01T00:00:00.000Z' })
  @Expose()
  dueDate?: Date;

  @ApiProperty({ example: '65f1a2b3c4d5e6f7a8b9c0d2' })
  @Expose()
  @Transform(({ value }: { value: Types.ObjectId }) => value?.toString())
  userId?: string;

  @ApiProperty()
  @Expose()
  deletedAt?: Date;
}
