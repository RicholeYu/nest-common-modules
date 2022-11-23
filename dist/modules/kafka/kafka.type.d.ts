import { Consumer, Producer } from 'kafkajs';
export interface ProducerCache {
    [topic: string]: Producer;
}
export interface ConsumerCache {
    [topic: string]: Consumer;
}
