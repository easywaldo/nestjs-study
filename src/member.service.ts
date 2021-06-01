import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Member, MemberDocument } from "./domain/entity/member.schema";
import { JoinMemberRequestDto } from "./dto/JoinMemberRequestDto";

@Injectable()
export class MemberService {
    // constructor(@InjectModel(Member.name) private memberModel: Model<MemberDocument>) {}
    constructor(
        @InjectConnection('member') private connection: Connection,
        @InjectModel(Member.name) private memberModel: Model<MemberDocument>) {}

    joinMember(joinRequestDto: JoinMemberRequestDto): Member {
        console.log(joinRequestDto);
        return JoinMemberRequestDto.toEntity(
            joinRequestDto.memberName, joinRequestDto.memberId, joinRequestDto.memberAge, joinRequestDto.memberPwd);
    }

    async findAll(): Promise<Member[]> {
        return this.memberModel.find().exec();
      }
}