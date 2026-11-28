
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

import ajv  from "./ajv.validations.js";

const compiledSchemas = new Map<AnySchema, ValidateFunction>();

function getValidator(schema: AnySchema): ValidateFunction {
  let validator = compiledSchemas.get(schema);

  if (!validator) {
    validator = ajv.compile(schema);
    compiledSchemas.set(schema, validator);
  }

  return validator;
}

function formatValidationErrors(
  errors: ErrorObject[] = [],
): ValidationErrorDetail[] {
  return errors.map((error) => {
    const params = error.params as {
      missingProperty?: string;
      additionalProperty?: string;
      limit?: number;
    };

    const field =
      error.keyword === "required"
        ? params.missingProperty ?? "body"
        : error.keyword === "additionalProperties"
          ? params.additionalProperty ?? "body"
          : error.instancePath
            .split("/")
            .filter(Boolean)
            .pop()
            ?.replace(/~1/g, "/")
            .replace(/~0/g, "~") ?? "body";

    const label = field
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .replace(/^./, (char) => char.toUpperCase());

    let message = "Invalid value.";

    switch (error.keyword) {
      case "required":
        message = `${label} is required.`;
        break;

      case "type":
        message = `${label} must be a valid ${error.params.type}.`;
        break;

      case "minLength":
        message = `${label} must contain at least ${params.limit} characters.`;
        break;

      case "maxLength":
        message = `${label} must not exceed ${params.limit} characters.`;
        break;

      case "minimum":
        message = `${label} must be at least ${params.limit}.`;
        break;

      case "maximum":
        message = `${label} must not exceed ${params.limit}.`;
        break;

      case "format": {
        const formatMessages: Record<string, string> = {
          email: "must be a valid email address.",
          "date-time": "must be a valid date and time (ISO 8601 format).",
          date: "must be a valid date (YYYY-MM-DD).",
          time: "must be a valid time.",
          uri: "must be a valid URL.",
          url: "must be a valid URL.",
          uuid: "must be a valid UUID.",
          ipv4: "must be a valid IPv4 address.",
          ipv6: "must be a valid IPv6 address.",
        };

        message = `${label} ${formatMessages[error.params.format] ?? "has an invalid format."}`;
        break;
      }

      case "pattern": {
        const patternMessages: Record<string, string> = {
          "^[A-Z0-9_-]+$":
            "must contain only uppercase letters, numbers, underscores, and hyphens.",
          "^[a-zA-Z0-9_-]+$":
            "must contain only letters, numbers, underscores, and hyphens.",
          "^[0-9]+$":
            "must contain only numeric digits.",
          "^[a-zA-Z]+$":
            "must contain only letters.",
          "^[0-9]{10}$":
            "must contain exactly 10 digits.",
        };

        message =
          `${label} ${patternMessages[error.params.pattern] ?? "has an invalid format. Please check the required format."}`;
        break;
      }

      case "enum":
        message = `${label} contains an invalid value.`;
        break;

      case "additionalProperties":
        message = `${label} is not allowed.`;
        break;

      case "minItems":
        message = `${label} must contain at least ${params.limit} items.`;
        break;

      case "maxItems":
        message = `${label} must not contain more than ${params.limit} items.`;
        break;

      case "uniqueItems":
        message = `${label} must not contain duplicate values.`;
        break;

      case "const":
        message = `${label} contains an invalid value.`;
        break;

      case "dependencies":
      case "dependentRequired":
        message = `${label} is missing a required related field.`;
        break;
    }

    return {
      field,
      message,
    };
  });
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
          ...formatValidationErrors(validator.errors ?? []),
        );
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: {
          code: "VALIDATION_ERROR",
          message: "Request validation failed.",
          details: errors,
        },
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    }

    return next();
  };
}
