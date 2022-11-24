import { DynamicModule } from '@nestjs/common';
import { KafkaModuleOption } from './kafka.type';
export declare class KafkaModule {
    static forRoot(options: KafkaModuleOption): DynamicModule;
}
