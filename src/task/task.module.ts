import { Module } from '@nestjs/common';
import { TaskMongoRepository } from './repository/task.mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/task.schema';
import { taskServiceImpl } from './service/task.service.impl';
import { TaskController } from './task.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [
    { provide: 'TaskRepository', useClass: TaskMongoRepository },
    { provide: 'TaskService', useClass: taskServiceImpl },
  ],
  controllers: [TaskController],
})
export class TaskModule {}
