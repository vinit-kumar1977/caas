import { Ajv } from "ajv";
import addFormats from "ajv-formats";

export const ajv = new Ajv({
  allErrors: true,
  strict: true,
  strictRequired: true,
  coerceTypes: false,
  useDefaults: false,
  removeAdditional: false,
  validateFormats: true,
  messages: true,
  loopEnum: 100,
});

addFormats.default?.(ajv);