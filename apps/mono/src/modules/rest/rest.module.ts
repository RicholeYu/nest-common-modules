import {HttpModule} from '@nestjs/axios';
import {Global, Module} from '@nestjs/common';
import {RestService} from './rest.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [RestService],
  exports: [RestService],
})
export class RestModule {}

export {RestService} from './rest.service';
