import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './domain/entity/member.schema';
import { LoggerMiddleware } from './loggermiddleware.middleware';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware)
        .forRoutes('member');
    }
  }