import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Books Shelf')
    .setDescription('The book shelf API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api-document', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(3000, async () => {
    console.log(`################################################
  🛡️  Server listening on port: ${await app.getUrl()} 🛡️
################################################`);
  });
}
bootstrap();
