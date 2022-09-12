import { Money } from '../money';
import { CurrencyCode } from '../currency-code.enum';

describe('Money', () => {
  it('wont allow to create money with negative value', () => {
    expect(() => {
      Money.create(-1, CurrencyCode.PLN);
    }).toThrow('Money value cannot be negative');
  });

  it('will allow to properly create money object', () => {
    const result = Money.create(5, CurrencyCode.PLN);
    expect(result.value).toBe(5);
    expect(result.currency).toBe(CurrencyCode.PLN);
  });
});
