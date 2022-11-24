import { DynamicModule } from '@nestjs/common';
import { KafkaModuleOption } from './kafka.type';
export declare class KafkaModule {
    static feature(options: KafkaModuleOption): DynamicModule;
}
