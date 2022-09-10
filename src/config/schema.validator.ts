import Joi from 'joi';

export const ConfigSchemaValidator = Joi.object({
  PORT: Joi.number().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_LOGGING: Joi.boolean().required(),
  TYPEORM_MIGRATIONS_RUN: Joi.boolean().required(),
});
