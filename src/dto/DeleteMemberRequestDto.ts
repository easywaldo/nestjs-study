import { ApiProperty } from '@nestjs/swagger';

export class DeleteMemberRequestDto {
  @ApiProperty()
  readonly memberId: string;
  constructor(memberId: string) {
    this.memberId = memberId;
  }
}
