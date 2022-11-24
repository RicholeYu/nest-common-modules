import {NestFactory} from '@nestjs/core';
import {ExampleModule} from './example.module';

async function bootstrap() {
  const app = await NestFactory.create(ExampleModule);

  await app.listen(4567, () => {
    console.log('example project is listening on 4567');
  });
}
bootstrap();
