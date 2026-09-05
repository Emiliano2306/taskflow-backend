import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from '../enum/task-status.enum';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;
  @Prop()
  description?: string;
  @Prop({
    type: String,
    enum: TaskStatus,
    default: TaskStatus.TODO,
    required: true,
  })
  status: TaskStatus;
  @Prop({ type: [String], default: [] })
  tags?: string[];
  @Prop()
  dueDate?: Date;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId?: Types.ObjectId;
  @Prop()
  deletedAt: Date;
}
export const TaskSchema = SchemaFactory.createForClass(Task);
