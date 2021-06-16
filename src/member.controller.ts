import { Delete, Get, Post } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { Member } from "./domain/entity/member.schema";
import { DeleteMemberRequestDto } from "./dto/DeleteMemberRequestDto";
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

    @Delete("withdraw")
    deleteMember(@Body() request: DeleteMemberRequestDto): void {
        this.memberService.deleteMember(request);
    }

    @Get("findAll")
    async findAll() : Promise<Member[]> {
        var result = [];
        return await this.memberService.findAll();
    }
}