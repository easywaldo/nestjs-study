export class Member {
    private memberName : string;
    private memberId : string;
    private memberAge: number;
    private memberPwd : string;

    public constructor(
        memberName : string, 
        memberId : string,
        memberAge : number,
        memberPwd : string) {
        this.memberName = memberName;
        this.memberId = memberId;
        this.memberAge = memberAge;
        this.memberPwd = memberPwd;
    }
}