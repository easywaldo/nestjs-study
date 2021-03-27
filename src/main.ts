import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import * as session from 'express-session';
import { Redis } from 'redis';
//import { RedisStore } from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const redis = require('redis')
  const session = require('express-session')

  let RedisStore = require('connect-redis')(session)
  let redisClient = redis.createClient()

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({ 
      secret: 'my-secret',
      resave: true,
      saveUnInitialized: false,
      store: new RedisStore({ client: redisClient}),
    })
  )

  const config = new DocumentBuilder()
    .setTitle('app example')
    .setDescription('app description')
    .setVersion('1.0')
    .addTag('sample api')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(80);
}



bootstrap();
