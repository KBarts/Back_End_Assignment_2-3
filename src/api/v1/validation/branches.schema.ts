import Joi from "joi";

// Body for creating a branch
export const branchCreateSchema = Joi.object({
  name: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
}).required();

// Body for updating a branch
export const branchUpdateSchema = Joi.object({
  name: Joi.string().trim(),
  address: Joi.string().trim(),
  phone: Joi.string().trim(),
  // id is not settable in the body
  id: Joi.forbidden(),
}).min(1);
