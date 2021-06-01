import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type MemberDocument = Member & Document;
@Schema()
export class Member {
    @Prop({required: true})
    private memberName : string;
    @Prop({required: true})
    private memberId : string;
    @Prop({required: true})
    private memberAge: number;
    @Prop({required: true})
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

export const MemberSchema = SchemaFactory.createForClass(Member);