import { ApiProperty } from "@nestjs/swagger";

export class UpdateMemberRequestDto {
    @ApiProperty()
    readonly memberId : string;
    @ApiProperty()
    readonly memberPwd : string;
    @ApiProperty()
    readonly memberName : string;
    @ApiProperty()
    readonly memberAge : number;

    public constructor(
        memberId: string,
        memberPwd: string, 
        memberName: string, 
        memberAge: number) {
            this.memberId = memberId;
            this.memberName = memberName;
            this.memberPwd = memberPwd;
            this.memberAge = memberAge;
        }
}