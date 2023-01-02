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
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';


// Module means that this class could be injected into other classes
// If you have other modules, you can import them here, and connect them to other modules
@Module({
  imports: [ConfigModule.forRoot(), PrometheusModule.register(), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: typeOrmConfig,
    inject: [ConfigService],
  }), TagModule, UserModule],
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
