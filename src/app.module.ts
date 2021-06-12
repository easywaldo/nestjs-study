import { CatsService } from './cats.service';
import { HttpModule, Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './loggermiddleware.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberService } from './member.service';
import * as memberSchema from './domain/entity/member.schema';
import { MemberModule } from './member.module';
import { Connection, Model } from 'mongoose';
import { Member, MemberDocument, MemberSchema } from './domain/entity/member.schema';

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
      connectionName: 'sample_airbnb',
      connectionFactory: (connection: Connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }
    }),

    // MongooseModule.forRoot('mongodb+srv://easywaldo:rlekflqk1!@cluster0.figii.mongodb.net/easywaldo?retryWrites=true&w=majority', {
    //   connectionName: 'member',
    //   provide: MemberService, MemberSchema: memberSchema.MemberSchema,
    //   useFactory: (memberConnection: Connection) => memberModelFn(memberConnection)
    // }),

    // MongooseModule.forRoot('mongodb+srv://easywaldo:rlekflqk1!@cluster0.figii.mongodb.net/easywaldo?retryWrites=true&w=majority', {
    //   connectionFactory: (connection: Connection) => {
    //     //connection.plugin(require('mongoose-autopopulate'));
    //     provide: MemberService, MemberSchema: memberSchema.MemberSchema,
    //     //return connection;
    //   }
    // }),

    //MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }], 'member'),
    MemberModule,

  ],
  controllers: [
    AppController,
  ],
  providers: [
    CatsService, 
    AppService,
  ],
})


//export const memberModelFn = (connection: Connection) => connection.model<MemberDocument>('Member', MemberSchema, 'member')



export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('app');
  }
}
