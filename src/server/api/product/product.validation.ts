import { Joi } from 'express-validation';

const createProductValidate = {
  body: Joi.object({
    name: Joi.string().required(),
    des: Joi.string().required(),
    price: Joi.number().strict().required(),
  })
}

const updateProductValidate = {
  body: Joi.object({
    name: Joi.string().required(),
    des: Joi.string().required(),
    price: Joi.number().strict().required(),
  }),
  params: Joi.object({
    id: Joi.string().required()
  })
}

const deleteProductValidate = {
  params: {
    id: Joi.string().required(),
  }
}

const ProductValidation = {
  createProductValidate,
  updateProductValidate,
  deleteProductValidate,
}

export default ProductValidation;