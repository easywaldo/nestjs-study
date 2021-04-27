import { Controller, Get, Query, Post, Body, Put, Param, Delete, Req, Session } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { CatsService } from './cats.service';
import axios, { AxiosResponse } from "axios";
import { Cat } from './dto/Cat';
import { SampleRequestDto } from './dto/SampleRequestDto';
@Controller("app")
export class AppController {

  constructor(
    private readonly appService: AppService, 
    private readonly catService: CatsService) {
  }

  @Get("hello")
  getHello(@Query('name') name, @Session() session: Record<string, any>): string {
    session.visits = session.visits ? session.visits + 1 : 1;
    return this.appService.getHello(name + ", session visits is : " + session.visits);
  }

  @Post("getData")
  getData(@Body() request: SampleRequestDto): JSON{
    return this.appService.getData(request);
  }

  @Get("findCat")
  findCat(): JSON {
    let result : Cat[] = [];
    this.catService.findAll().subscribe({
      next(x) {
          console.log(x);
          result.push(x);
      },
      error(err) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('done'); }
    });

    return JSON.parse(JSON.stringify(result));
  }

  @Get("selectMongoDb")
  selectMongoDb(@Query('country') country): Promise<any> {
    return this.catService.findMongoDb(country);
  }
}
