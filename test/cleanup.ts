import { INestApplication } from '@nestjs/common';

export const cleanup = async (app: INestApplication) => {
  await app.close();
};
