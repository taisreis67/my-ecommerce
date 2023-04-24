import express from 'express';
import { validate } from './cpfValidation';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/buy', (req, res) => {
  const cpf = req.body.client ? req.body.client.cpf : null;
  if(cpf && !validate(cpf)) {
    res.status(500).send('CPF invalid!');
  }

  let totalOrderValue = 0;
  const products = req.body.products;
  for (const product of products) {
    let productTotalValue = product.value * product.quantity;
    let discountValue = product.discountCoupon ? (productTotalValue * product.discountCoupon) / 100 : 0;
    totalOrderValue +=  productTotalValue - discountValue;
  }
  res.send({ totalOrderValue });
});

app.listen(port, () => {
  console.log(`Server up on http://localhost:${port} port`);
});