import Joi from "joi";

// Body for creating an employee
export const employeeCreateSchema = Joi.object({
  name: Joi.string().trim().required(),
  position: Joi.string().trim().required(),
  department: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().trim().required(),
  branchId: Joi.number().integer().required(),
}).required();

// Body for updating an employee
export const employeeUpdateSchema = Joi.object({
  name: Joi.string().trim(),
  position: Joi.string().trim(),
  department: Joi.string().trim(),
  email: Joi.string().email(),
  phone: Joi.string().trim(),
  branchId: Joi.number().integer(),
  // id is not settable in the body
  id: Joi.forbidden(),
}).min(1);
