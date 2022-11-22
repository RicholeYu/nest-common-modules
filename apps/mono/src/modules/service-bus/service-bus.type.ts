import {ServiceBusReceiver, ServiceBusSender} from '@azure/service-bus';

export type ServiceBusType = 'topic' | 'queue';
export type ServiceBusPolicy = 'send' | 'listen' | 'sendListen';

export type SendersCache = {
  [topicName: string]: ServiceBusSender;
};

export type ReceiversCache = {
  [topicName: string]: ServiceBusReceiver;
};
