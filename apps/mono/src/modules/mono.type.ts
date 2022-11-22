import { ConfigModuleOptions } from '@nestjs/config';

export interface PruModuleOptions {
  enableAuthorizationGuard?: boolean;
  ConfigModule?: ConfigModuleOptions;
}
