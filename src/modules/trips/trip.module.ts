import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { controllers } from './controllers';
import { services } from './services';
import { commandHandlers } from './commands/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [...services, ...commandHandlers],
})
export class TripModule {}
