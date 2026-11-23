
import type { RequestHandler } from "express";
import type {
  AnySchema,
  ErrorObject,
  ValidateFunction,
} from "ajv";

import type {
  RequestValidationSchemas,
  RequestValidationSource,
  ValidationErrorDetail,
} from "./validation-type.validations.js";

import { ajv } from "./ajv.validations.js";

const compiledSchemas = new Map<
  AnySchema,
  ValidateFunction
>();

function getValidator(schema: AnySchema): ValidateFunction {
  let validator = compiledSchemas.get(schema);

  if (!validator) {
    validator = ajv.compile(schema);
    compiledSchemas.set(schema, validator);
  }

  return validator;
}

function formatValidationErrors(
  source: RequestValidationSource,
  errors: ErrorObject[] = [],
): ValidationErrorDetail[] {
  return errors.map((error) => ({
    source,
    field: error.instancePath || "/",
    message: error.message ?? "Invalid value",
    code: error.keyword,
  }));
}

export function validateRequest(
  schemas: RequestValidationSchemas,
): RequestHandler {

  const validators = Object.entries(schemas).map(
    ([source, schema]) => ({
      source: source as RequestValidationSource,
      validator: getValidator(schema),
    }),
  );

  return (req, res, next) => {
    const errors: ValidationErrorDetail[] = [];

    for (const { source, validator } of validators) {
      let data: unknown;

      switch (source) {
        case "body":
          data = req.body;
          break;

        case "query":
          data = req.query;
          break;

        case "params":
          data = req.params;
          break;

        case "headers":
          data = req.headers;
          break;

        default:
          continue;
      }

      const valid = validator(data);

      if (!valid) {
        errors.push(
          ...formatValidationErrors(
            source,
            validator.errors ?? [],
          ),
        );
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Request validation failed",
          details: errors,
        },
      });
    }

    return next();
  };
}
