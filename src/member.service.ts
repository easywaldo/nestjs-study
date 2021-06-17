import { Inject } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Member, MemberDocument } from "./domain/entity/member.schema";
import { DeleteMemberRequestDto } from "./dto/DeleteMemberRequestDto";
import { JoinMemberRequestDto } from "./dto/JoinMemberRequestDto";
import { UpdateMemberRequestDto } from "./dto/UpdateMemberRequestDto";

@Injectable()
export class MemberService {
    constructor(
        @InjectConnection('member') private connection: Connection,
        @Inject('member_model') private readonly memberModel: Model<MemberDocument>
    ) {}

    joinMember(joinRequestDto: JoinMemberRequestDto): Member {
        console.log('memberModel', this.memberModel);
        var member = JoinMemberRequestDto.toEntity(
            joinRequestDto.memberName, joinRequestDto.memberId, joinRequestDto.memberAge, joinRequestDto.memberPwd);
        const joinEntity = new this.memberModel(joinRequestDto);
        console.log('joinEntity', joinEntity);
        joinEntity.save();
        return member;
    }

    deleteMember(deleteMemberRequestDto: DeleteMemberRequestDto): void {
        console.log('deleteMemberRequestDto.memberId', deleteMemberRequestDto.memberId);
        let member = this.connection.models.Member.find({memberId: deleteMemberRequestDto.memberId});
        this.memberModel.deleteOne(member).exec().catch(function(err) {
            console.log(err);
            throw err;
        });
    }

    updateMember(updateMemberRequestDto: UpdateMemberRequestDto): void {
        console.log('updateMemberRequestDto', updateMemberRequestDto);
        let member = this.connection.models.Member.find({memberId: updateMemberRequestDto.memberId});
        this.memberModel.updateOne(updateMemberRequestDto).exec().catch(function (err){ 
            console.log(err);
            throw err;
        });

    }

    async findAll(): Promise<Array<Member>> {
        //let result = this.connection.collection('member').findOne({'memberName': 'leejinam'});
        console.log('connection', this.connection);
        console.log('memberModel', this.memberModel);
        let awaitResult = await this.connection.models.Member.find({});
        console.log('awaitResult: ', awaitResult);
        
        //return awaitResult;               // 비동기방식 조회
        return this.memberModel.find({});   // 동기식 조회


        /* connection 내 컬렉션을 이용한 조회 방법 */
        // let resultList = this.connection.collection('member').find({});
        // var list = new Array<Member>();
        // return resultList.forEach(function(x) {
        //     list.push(
        //         new Member(x.memberName, x.memberId, x.memberAge, x.memberPwd)
        //     );
        // }).then(function (r) {
        //     console.log('list : ' , list);
        //     return list;
        // }).catch(function (err) {
        //     console.log(err);
        //     return null;
        // });
    }
}