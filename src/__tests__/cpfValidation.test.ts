import 'jest';
import { validate } from '../cpfValidation';

describe('CPF Validation function', () => {
  it.each(['123456789', '123456789012345'])('Should return false when CPF is < 11 or > 14', (cpf) => {
    const response = validate(cpf);

    expect(response).toBe(false);
  });

  it('Should return false when CPF has equal numbers', () => {
    const cpf = '111.111.111-11';

    const response = validate(cpf);

    expect(response).toBe(false);
  });

  it('Should return true when CPF is valid', () => {
    const cpf = '378.335.098-09';

    const response = validate(cpf);

    expect(response).toBe(true);
  });

  it('Should return false when CPF is invalid', () => {
    const cpf = '378.111.111-09';

    const response = validate(cpf);

    expect(response).toBe(false);
  });
});