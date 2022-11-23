import {MessageDto} from './message.dto';
import rTracer from 'cls-rtracer';

export class ServiceBusMessageDto extends MessageDto {
  constructor(data: any) {
    super();
    this.specversion = '1.0';
    this.type = data.type;
    this.source = data.source;
    this.subject = data.subject;
    this.id = data.id || (rTracer.id() as string);
    this.time = new Date();
    this.datacontenttype = 'application/json';
    this.data = data.data;
  }
}
