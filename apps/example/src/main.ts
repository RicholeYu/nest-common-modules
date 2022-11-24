import {NestFactory} from '@nestjs/core';
import {ExampleModule} from './example.module';
import {AllExceptionFilter} from './filter/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(ExampleModule);

  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(4567, () => {
    console.log('example project is listening on 4567');
  });
}
bootstrap();
