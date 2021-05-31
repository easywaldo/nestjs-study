import { Post } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { Member } from "./domain/entity/Member";
import { JoinMemberRequestDto } from "./dto/JoinMemberRequestDto";
import { MemberService } from "./member.service";

@Controller("member")
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @Post("join")
    joinMember(@Body() request: JoinMemberRequestDto): Member {
        var member = this.memberService.joinMember(request);
        return member;
    }
}