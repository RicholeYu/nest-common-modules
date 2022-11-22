import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MonoService implements OnModuleInit {
  name: string;
  port: number;
  logger = new Logger(MonoService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    console.log('init mono service');
    this.init();
  }

  async init() {
    this.name = this.configService
      .get<string>('npm_package_name')
      .toLocaleUpperCase();
    this.port = +this.configService.get(`${this.name}_PORT`);
    if (!this.port) {
      this.logger.error(
        `please add enviroment variable ${this.name}_PORT to .env or change npm package name`,
      );
      process.exit(0);
    }
  }
}
