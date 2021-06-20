export class FindMemberRequestDto {
    readonly memberId: string;
    constructor(memberId: string) {
        this.memberId = memberId;
    }
}