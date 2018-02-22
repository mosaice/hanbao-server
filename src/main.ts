import * as express from 'express';
import * as path from 'path';
import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { JSONInterceptor } from './utils/json.interceptor';
import { AnyExceptionFilter } from './utils/anyException.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {


  
	const app = await NestFactory.create(ApplicationModule);
  
  app.setGlobalPrefix('/api/v1')

  const options = new DocumentBuilder()
    .setTitle('Hanbao example')
    .setDescription('The Hanbao API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/doc', app, document);
  
  app.use(session({
    secret: 'nestjs session',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60000
    }
  }));

  app.use('/static', express.static(path.resolve(__dirname, '../public')));

  app.useGlobalFilters(new AnyExceptionFilter());
  app.useGlobalInterceptors(new JSONInterceptor ());

	await app.listen(3000);
}
bootstrap();
