import { Injectable } from "@nestjs/common";
import { JoinMemberRequestDto } from "./dto/JoinMemberRequestDto";

@Injectable()
export class MemberService {
    joinMember(joinRequestDto: JoinMemberRequestDto): boolean {
        return true;
    }
}