import { ValueTransformer } from 'typeorm';
import { DateTime } from 'luxon';

export class DateTimeTransformer implements ValueTransformer {
  public from(value: Date | null) {
    return value ? DateTime.fromJSDate(value) : null;
  }

  public to(value?: DateTime) {
    if (DateTime.isDateTime(value)) {
      return value.toISO();
    }

    return value;
  }
}
