import { Delete, Get, Post, Put } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Member } from './domain/entity/member.schema';
import { DeleteMemberRequestDto } from './dto/DeleteMemberRequestDto';
import { JoinMemberRequestDto } from './dto/JoinMemberRequestDto';
import { UpdateMemberRequestDto } from './dto/UpdateMemberRequestDto';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('join')
  joinMember(@Body() request: JoinMemberRequestDto): Promise<Member> {
    const member = this.memberService.joinMember(request);
    return member;
  }

  @Delete('withdraw')
  deleteMember(@Body() request: DeleteMemberRequestDto): void {
    this.memberService.deleteMember(request);
  }

  @Get('findAll')
  async findAll(): Promise<Member[]> {
    return await this.memberService.findAll();
  }

  @Put('update')
  updateMember(@Body() request: UpdateMemberRequestDto): void {
    this.memberService.updateMember(request);
  }
}
