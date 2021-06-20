import { ApiProperty } from '@nestjs/swagger';
import { Member } from 'src/domain/entity/member.schema';

export class JoinMemberRequestDto {
    @ApiProperty()
    readonly memberName: string;
    @ApiProperty()
    readonly memberId: string;
    @ApiProperty()
    readonly memberAge: number;
    @ApiProperty()
    readonly memberPwd: string;

    constructor(
        memberName: string,
        memberId: string,
        memberAge: number,
        memberPwd: string,
    ) {
        this.memberName = memberName;
        this.memberId = memberId;
        this.memberAge = memberAge;
        this.memberPwd = memberPwd;
    }

    public static toEntity(memberName, memberId, memberAge, memberPwd): Member {
        return new Member(memberName, memberId, memberAge, memberPwd);
    }
}
