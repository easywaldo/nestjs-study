import { Controller, Get, Query, Post, Body, Put, Param, Delete, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { SampleRequestDto } from './dto/SampleRequestDto';

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  getHello(@Query('name') name): string {
    return this.appService.getHello(name);
  }

  @Post("getData")
  getData(@Body() request: SampleRequestDto): JSON{
    return this.appService.getData(request);
  }
}
