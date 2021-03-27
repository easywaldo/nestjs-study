import { HttpService, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from "axios";
import { Observable } from 'rxjs';
import { Cat } from './dto/Cat';

@Injectable()
export class CatsService { 
    constructor(private httpService: HttpService) {}

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
}
