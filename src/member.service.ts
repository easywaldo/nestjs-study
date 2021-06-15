import { Inject } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Member, MemberDocument } from "./domain/entity/member.schema";
import { JoinMemberRequestDto } from "./dto/JoinMemberRequestDto";

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

    async findAll(): Promise<Array<Member>> {
        //let result = this.connection.collection('member').findOne({'memberName': 'leejinam'});
        console.log('connection', this.connection);
        console.log('memberModel', this.memberModel);
        let awaitResult = await this.connection.models.Member.find({});
        console.log('awaitResult: ', awaitResult);


        //return this.memberModel.find();


        let resultList = this.connection.collection('member').find({});
        var list = new Array<Member>();
        return resultList.forEach(function(x) {
            list.push(
                new Member(x.memberName, x.memberId, x.memberAge, x.memberPwd)
            );
        }).then(function (r) {
            console.log('list : ' , list);
            return list;
        }).catch(function (err) {
            console.log(err);
            return null;
        });




        //console.log(list);
        //return list;




        // return result.then(function (r) {
        //     console.log(r);
        //     return r;
        // }).catch(function (err) { 
        //     return null;
        // });





        // return result.then(function (r){
        //     console.log(r);
        //     return r;
        // }).catch(function (err) { console.log(err)});
        //console.log(this.memberModel);
        //return this.memberModel.find().exec();
    }
}