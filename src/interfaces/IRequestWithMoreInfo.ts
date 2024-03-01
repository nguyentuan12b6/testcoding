import { Request } from 'express';
import ProductEntity from '../entities/Product.entity';

export interface IRequestWitMoreInterface extends Request {
  product?: ProductEntity;
}