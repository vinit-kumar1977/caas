import { Ajv } from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({
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

addFormats.default(ajv);

ajv.addKeyword({
  keyword: "maxJsonBytes",
  type: "object",
  schemaType: "number",
  errors: false,

  validate(maxBytes: number, data: Record<string, unknown>) {
    if (
      data === null ||
      typeof data !== "object" ||
      Array.isArray(data)
    ) {
      return false;
    }

    try {
      const serialized = JSON.stringify(data);

      if (serialized === undefined) {
        return false;
      }

      return Buffer.byteLength(serialized, "utf8") <= maxBytes;
    } catch {
      return false;
    }
  },
});

export default ajv;