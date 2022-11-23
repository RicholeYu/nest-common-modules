import {Global, Module} from '@nestjs/common';
import {RestModule} from '../rest/rest.module';
import {ServiceBusService} from './service-bus.service';

@Global()
@Module({
  imports: [RestModule],
  providers: [ServiceBusService],
  exports: [ServiceBusService],
})
export class ServiceBusModule {}

export {ServiceBusService} from './service-bus.service';
