import { CurrencyCode } from './currency-code.enum';
import { BadRequestException } from '@nestjs/common';

export class Money {
  public readonly value: number;
  public readonly currency: CurrencyCode;

  private constructor(value: number, currencyCode: CurrencyCode) {
    this.value = value;
    this.currency = currencyCode;
  }

  static create(value: number, currencyCode: CurrencyCode) {
    if (value <= 0) {
      throw new BadRequestException(`Money value cannot be negative`);
    }

    return new Money(value, currencyCode);
  }
}
