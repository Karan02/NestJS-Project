import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// import { CookieSession } from 'cookie-session'; //do not use this, not works with our current tsconfig specifically for cookie-session library.
// const cookieSession =  require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieSession({
  //     keys: ['asdsd']
  //   })
  // );

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist:true // no additional properties will be considered in request body api
  //   })
  // );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
