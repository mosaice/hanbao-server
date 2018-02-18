import * as express from 'express';
import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const instance = express();
  instance.use(session({
    secret: 'nestjs session',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60000
    }
  }));
	// const app = await NestFactory.create(ApplicationModule);
	const app = await NestFactory.create(ApplicationModule, instance);

  const options = new DocumentBuilder()
    .setTitle('Hanbao example')
    .setDescription('The Hanbao API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('/api', app, document);

	await app.listen(3000);
}
bootstrap();
