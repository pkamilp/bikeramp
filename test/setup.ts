import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ApiClientService } from './api-client.service';
import { TypeOrmConfigService } from '../src/modules/database/typeorm-config.service';
import { MockTypeOrmConfigService } from './mock-typeorm-config.service';
import { ValidationPipe } from '@nestjs/common';

export const setupTests = async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
    providers: [ApiClientService],
  })
    .overrideProvider(TypeOrmConfigService)
    .useValue(new MockTypeOrmConfigService())
    .compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();

  const apiClient = app.get(ApiClientService);
  apiClient.setUrl(app.getHttpServer());

  return { app, apiClient };
};
