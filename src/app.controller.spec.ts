import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsService } from './cats.service';
import { SampleRequestDto } from './dto/SampleRequestDto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      //controllers: [AppController],
      providers: [AppService],
    }).compile();

    //appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    var requestDto = new SampleRequestDto("kitty", 100000);
    it('should return get data', () => {
      expect(appService.getData(requestDto)).toEqual(JSON.parse("{\"carName\":\"kitty\",\"salePrice\":100000}"));
    });
  });


  
});
