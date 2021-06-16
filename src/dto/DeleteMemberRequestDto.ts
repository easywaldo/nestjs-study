export class DeleteMemberRequestDto {
    readonly memberId: string;
    constructor(memberId: string) {
        this.memberId = memberId;
    }
}