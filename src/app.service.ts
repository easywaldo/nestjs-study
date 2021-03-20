import { Injectable } from '@nestjs/common';
import { SampleRequestDto } from './dto/SampleRequestDto';

@Injectable()
export class AppService {
  getHello(name : String): string {
    return 'Gretting! ' + name;
  }

  getData(requestDto : SampleRequestDto): JSON {
    return JSON.parse(JSON.stringify(requestDto));
  }
}
