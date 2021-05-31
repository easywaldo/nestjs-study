import { Injectable } from "@nestjs/common";
import { Member } from "./domain/entity/Member";
import { JoinMemberRequestDto } from "./dto/JoinMemberRequestDto";

@Injectable()
export class MemberService {
    joinMember(joinRequestDto: JoinMemberRequestDto): Member {
        console.log(joinRequestDto);
        return JoinMemberRequestDto.toEntity(
            joinRequestDto.memberName, joinRequestDto.memberId, joinRequestDto.memberAge, joinRequestDto.memberPwd);
    }
}