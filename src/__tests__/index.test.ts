import 'jest';
import axios from 'axios';

const url = 'http://localhost:3000';

describe('Buy products', () => {
  it('Should to buy 3 products and returns the total order value', async () => {
    const body = {
      products: [
        {
          description: 'first description product',
          value: 10.00,
          quantity: 2
        },
        {
          description: 'second description product',
          value: 20.50,
          quantity: 1
        },
        {
          description: 'third description product',
          value: 10.00,
          quantity: 3
        }
      ],
    };

    const response = await axios.post(`${url}/buy`, body);

    expect(response.data.totalOrderValue).toBe(70.50);
  });

  it('Should to buy a products with a discount coupon returns the total order value', async () => {
    const body = {
      products: [
        {
          description: 'first description product',
          value: 10.00,
          quantity: 2,
          discountCoupon: 10
        },
      ],
    };

    const response = await axios.post(`${url}/buy`, body);

    expect(response.data.totalOrderValue).toBe(18);
  });

  it('Does not should buy a product with invalid cpf', async () => {
    const body = {
      client: {
        cpf: '111.111.111-11'
      },
      products: [
        {
          description: 'first description product',
          value: 50.00,
          quantity: 1
        },
      ],
    };

    const response = await axios.post(`${url}/buy`, body).catch(error => error.response.data)

    expect(response).toBe('CPF invalid!');
  });
});
