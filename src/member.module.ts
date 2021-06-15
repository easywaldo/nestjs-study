import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken, MongooseModule, ModelDefinition, getConnectionToken } from '@nestjs/mongoose';
import { connection, Mongoose } from 'mongoose';
import { Member, MemberSchema } from './domain/entity/member.schema';
import { JoinMemberRequestDto } from './dto/JoinMemberRequestDto';
import { LoggerMiddleware } from './loggermiddleware.middleware';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot('mongodb+srv://easywaldo:rlekflqk1!@cluster0.figii.mongodb.net/easywaldo?retryWrites=true&w=majority', { 
          connectionName: 'member',
          connectionFactory: (connection) => {
              connection.plugin(require('mongoose-autopopulate'));
              return connection;
          },
        }),
        MongooseModule.forFeature([
            {
                name: 'member_model',
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
            name: 'member_service',
            provide: 'member_model',
            useFactory: (mongoose: Mongoose) => {
                const schema = MemberSchema;
                schema.pre('save', function() { 
                    console.log('member saved...');
                });
                schema.plugin(require('mongoose-autopopulate'));
                return mongoose.model('Member', schema);
            },
            inject: [getConnectionToken('member')]
        }
    ],
})

export class MemberModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware)    
        .forRoutes('member');
    }
}