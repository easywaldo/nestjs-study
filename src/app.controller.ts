import { Controller, Get, Query, Post, Body, Put, Param, Delete, Req, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { SampleRequestDto } from './dto/SampleRequestDto';

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  getHello(@Query('name') name, @Session() session: Record<string, any>): string {
    session.visits = session.visits ? session.visits + 1 : 1;
    return this.appService.getHello(name + ", session visits is : " + session.visits);
  }

  @Post("getData")
  getData(@Body() request: SampleRequestDto): JSON{
    return this.appService.getData(request);
  }
}
