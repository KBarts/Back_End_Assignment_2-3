import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateBody =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        details: error.details.map((d) => d.message),
      });
    }

    req.body = value;
    next();
  };
