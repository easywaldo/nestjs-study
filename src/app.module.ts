import { CatsService } from './cats.service';
import { HttpModule, Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './loggermiddleware.middleware';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    MongooseModule.forRoot('mongodb+srv://easywaldo:rlekflqk1!@cluster0.figii.mongodb.net/sample_airbnb?retryWrites=true&w=majority', {
      connectionName: 'easywaldo'
    }),
  ],
  controllers: [
    AppController],
  providers: [
    CatsService, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('app');
  }
}
