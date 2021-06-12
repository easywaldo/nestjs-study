import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { connection } from 'mongoose';
import { Member, MemberSchema } from './domain/entity/member.schema';
import { JoinMemberRequestDto } from './dto/JoinMemberRequestDto';
import { LoggerMiddleware } from './loggermiddleware.middleware';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb+srv://easywaldo:rlekflqk1!@cluster0.figii.mongodb.net/easywaldo?retryWrites=true&w=majority', { 
          //name: Member.name,
          connectionName: 'member',
          connectionFactory: (connection) => {
              connection.plugin(require('mongoose-autopopulate'));
              return connection;
          },
          //schema: MemberSchema 
        }),
        //MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }])
        MongooseModule.forFeature([
            {
                name: Member.name,
                schema: MemberSchema,
                discriminators: [
                  { name: JoinMemberRequestDto.name, schema: MemberSchema }
                ]
              },
        ], 'member'),
    ],
  controllers: [MemberController],
  providers: [
      MemberService,
        {
            provide: getModelToken(Member.name),
            //useValue: Member
            useFactory: (connection, schema) => {
                //const schema = MemberSchema;
                const member = Member.name;
                //schema.plugin(require('mongoose-autopopulate'));
                //return new MemberService(connection, schema);
                return schema;
            },
        }
    ],
})
//export class MemberModule {}

export class MemberModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware)
        .forRoutes('member');
    }
}