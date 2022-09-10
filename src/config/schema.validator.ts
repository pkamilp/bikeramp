import Joi from 'joi';

export const ConfigSchemaValidator = Joi.object({
  PORT: Joi.number().required(),
});
