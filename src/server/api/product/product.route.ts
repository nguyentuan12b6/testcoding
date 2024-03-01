import { Router } from 'express';
import { validate } from 'express-validation';
import ProductValidation from './product.validation';
import ProductController from './product.controller';

const ProductRouter = Router();

ProductRouter.route('/')
            .post(validate(ProductValidation.createProductValidate), ProductController.createProduct);

ProductRouter.route('/:id').patch(validate(ProductValidation.updateProductValidate), ProductController.updateProduct)
                          .delete(validate(ProductValidation.deleteProductValidate), ProductController.removeProductById);

ProductRouter.param('id', ProductController.loadProduct);

export default ProductRouter;