import express from 'express';
import { validate } from './cpfValidation';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/checkout', (req, res) => {
  const cpf = req.body.cpf ?? null;
  if(cpf && !validate(cpf)) res.status(500).send('CPF invalid!');
  const products = req.body.products;
  if(!products) res.status(500).send('No products!');

  let totalOrderValue = 0;
  for (const product of products) {
    totalOrderValue += product.value * product.quantity;
  }
  
  const discountCoupon = req.body.discountCoupon;
  if(discountCoupon) {
    totalOrderValue = totalOrderValue - (totalOrderValue *discountCoupon) / 100;
  }

  res.send({ totalOrderValue });
});

app.listen(port, () => {
  console.log(`Server up on http://localhost:${port} port`);
});