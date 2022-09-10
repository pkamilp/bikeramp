import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTripCommand } from '../create-trip.command';

@CommandHandler(CreateTripCommand)
export class CreateTripHandler implements ICommandHandler<CreateTripCommand> {
  async execute(command: CreateTripCommand) {
    return true;
  }
}
