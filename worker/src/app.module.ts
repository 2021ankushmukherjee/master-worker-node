import { MiddlewareConsumer, Module } from '@nestjs/common';
import { WorkerModule } from './worker/worker.module';
import { LoggerMiddleware } from './utils/logger.middleware';

@Module({
  imports: [WorkerModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware,)
      .forRoutes('*');
  }
}
