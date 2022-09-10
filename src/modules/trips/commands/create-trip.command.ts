import { DateTime } from 'luxon';

export class CreateTripCommand {
  constructor(
    public readonly startAddress: string,
    public readonly destinationAddress: string,
    public readonly price: number,
    public readonly date: DateTime,
  ) {}
}
