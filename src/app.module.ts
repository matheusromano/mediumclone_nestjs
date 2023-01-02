import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@app/config/typeorm.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@app/logging.interceptor';
import { UserModule } from '@app/user/user.module';
import { AuthMiddleware } from './user/middleware/auth.middleware';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';


// Module means that this class could be injected into other classes
// If you have other modules, you can import them here, and connect them to other modules
@Module({
  imports: [PrometheusModule.register(), TypeOrmModule.forRoot(typeOrmConfig), TagModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
