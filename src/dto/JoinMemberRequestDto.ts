export class JoinMemberRequestDto {
    private memberName : String;
    private memberId: String;
    private memberPwd: String;

    constructor(memberName: String, memberId: String, memberPwd: String) {
        this.memberName = memberName;
        this.memberId = memberId;
        this.memberPwd = memberPwd;
    }
}