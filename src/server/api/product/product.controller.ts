import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ProductEntity from '../../../entities/Product.entity';
import { IRequestWitMoreInterface } from '../../../interfaces/IRequestWithMoreInfo';
import { MyCustomError } from '../../../interfaces/index';
/**
 * Load product by id and append to request
 */
async function loadProduct(
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
): Promise<void> {
  try {
    const thisProduct = await ProductEntity.findOne({ id });
    if (thisProduct) {
      (req as IRequestWitMoreInterface).product = thisProduct;
      return next();
    }
    throw new MyCustomError('product not exist', httpStatus.BAD_REQUEST);
  } catch (error) {
    {
      return next(error);
    }
  }
}

async function createProduct(req: Request, res: Response, next: NextFunction): Promise<void | Response<string, any>> {
  interface IReqBody {
    name: string;
    des: string;
    price: number;
  }
  const { name, des, price } = req.body as IReqBody;
  try {
    await ProductEntity.create({
      name,
      des,
      price,
    }).save();
    return res
      .status(httpStatus.CREATED)
      .json({ message: 'create product success' });
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req:Request, res: Response, next: NextFunction): Promise<void | Response<string, any>> {
  const thizProduct = (req as IRequestWitMoreInterface).product;
  interface IPatchBody {
    name: string;
    des: string;
    price: number;
  }
  const {name, des, price} = req.body as IPatchBody;

  try {
      thizProduct.name = name;
      thizProduct.des = des;
      thizProduct.price = price;
    await thizProduct.save();
    return res.status(httpStatus.OK).json({ message: 'update product success' });
  } catch (error) {
    return next(error)
  }
}

async function removeProductById(req: Request, res: Response, next: NextFunction): Promise<void | Response<string, any>>{
  const thizProduct = (req as IRequestWitMoreInterface).product;
  try { 
    await thizProduct.remove();
    return res.json({ message: 'remove product success' })
  } catch (error) {
    return next(error);
  }
 }
const ProductController = {
  createProduct,
  updateProduct,
  loadProduct,
  removeProductById,
};

export default ProductController;
