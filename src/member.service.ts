import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Member, MemberDocument } from './domain/entity/member.schema';
import { DeleteMemberRequestDto } from './dto/DeleteMemberRequestDto';
import { FindMemberRequestDto } from './dto/FindMemberRequestDto';
import { JoinMemberRequestDto } from './dto/JoinMemberRequestDto';
import { UpdateMemberRequestDto } from './dto/UpdateMemberRequestDto';

@Injectable()
export class MemberService {
    constructor(
        @InjectConnection('member') private connection: Connection,
        @Inject('member_model') private readonly memberModel: Model<MemberDocument>
    ) {}

    async joinMember(joinRequestDto: JoinMemberRequestDto): Promise<Member> {
        console.log('memberModel', this.memberModel);

        let member = JoinMemberRequestDto.toEntity(
            joinRequestDto.memberName, joinRequestDto.memberId, joinRequestDto.memberAge, joinRequestDto.memberPwd);

        let findMember = await this.findMember(new FindMemberRequestDto(joinRequestDto.memberId));
        if (findMember != null) {
            console.log('duplicated member');
            return member;
        }

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
        this.memberModel.updateOne(updateMemberRequestDto).set("memberName", updateMemberRequestDto.memberName).exec().catch(function (err){ 
            console.log(err);
            throw err;
        });
    }

    async findMember(findMemberRequestDto: FindMemberRequestDto): Promise<MemberDocument> {
        let member = await this.memberModel.findOne({memberId: findMemberRequestDto.memberId});
        console.log('findMember', member);
        return member;
    }

    async findAll(): Promise<Array<Member>> {
        //let result = this.connection.collection('member').findOne({'memberName': 'leejinam'});
        console.log('connection', this.connection);
        console.log('memberModel', this.memberModel);
        let awaitResult = await this.connection.models.Member.find({});
        console.log('awaitResult: ', awaitResult);
        
        //return awaitResult;               // ??????????????? ??????
        return this.memberModel.find({});   // ????????? ??????


        /* connection ??? ???????????? ????????? ?????? ?????? */
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