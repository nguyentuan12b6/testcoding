import express, { Request, Response } from 'express';
import ProductRouter from './server/api/product/product.route';

const router = express.Router();

router.get('/health-check', (req: Request, res: Response) => {
  res.send('OKE');
});

router.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

router.use('/product', ProductRouter);

export default router;
