import { MessageDto } from './message.dto';
export declare class KafkaDataDto {
    name: string;
    type: string;
    module: string;
    feature: string;
}
export declare class KafkaMessageDto extends MessageDto {
    constructor(data: any);
    data: KafkaDataDto;
}
