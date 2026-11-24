import type { AnySchema } from "ajv";

export type RequestValidationSource =
  | "body"
  | "query"
  | "params"
  | "headers";

export type RequestValidationSchemas = Partial<
  Record<RequestValidationSource, AnySchema>
>;

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

