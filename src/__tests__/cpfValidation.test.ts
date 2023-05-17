import 'jest';
import Cpf from '../Cpf';

describe('CPF Validation function', () => {
  it('Should create a Cpf object when CPF value is valid', () => {
    const value = '378.335.098-09';
    const cpf = new Cpf('378.335.098-09');

    expect(cpf).toBeDefined();
    expect(cpf.getValue()).toBe(value);
  });

  it('Should return an Error when CPF value is invalid', () => {
    const value = '378.111.111-09';

    expect(() => new Cpf(value)).toThrow(new Error("Invalid Cpf!"));
  });

  it.each(['123456789', '123456789012345'])('Should return an Error when CPF value is < 11 or > 14', (value) => {
    expect(() => new Cpf(value)).toThrow(new Error("Invalid Cpf!"));
  });

  it('Should return an Error when CPF value has equal numbers', () => {
    const value = '111.111.111-11';

    expect(() => new Cpf(value)).toThrow(new Error("Invalid Cpf!"));
  });
});