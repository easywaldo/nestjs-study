import { HttpService, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from "axios";
import { Observable } from 'rxjs';
import { Cat } from './dto/Cat';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class CatsService { 
    constructor(private httpService: HttpService, @InjectConnection('easywaldo') private connection: Connection) {
    }

    findAll(): Observable<Cat> {
        //return this.httpService.get('http://localhost:80');
        let observable = new Observable<Cat>(subscriber => {
            subscriber.next(new Cat("kitty", "powerful", "russian"));
            subscriber.next(new Cat("puppy", "pretty", "odd eye"));
            setTimeout(() => {
                subscriber.next(new Cat("tom", "general", "normal"));
                subscriber.complete();
            }, 1000);
        }); 

        return observable;            
    }

    findMongoDb(country : string): Promise<any> {
        console.log(country);
        let result = this.connection.collection('listingsAndReviews')
            .findOne({"address.country": country});

        return result.then(function (r){
            console.log(r);
            return r;
        }).catch(function (err) { console.log(err)});
        
    }
}
