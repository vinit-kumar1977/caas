export const HTTPSTATUSCODE: Record<number, string> = {
  100: "CONTINUE",
  101: "SWITCHING_PROTOCOLS",
  102: "PROCESSING",
  103: "EARLY_HINTS",
  200: "OK",
  201: "CREATED",
  202: "ACCEPTED",
  203: "NON_AUTHORITATIVE_INFORMATION",
  204: "NO_CONTENT",
  205: "RESET_CONTENT",
  206: "PARTIAL_CONTENT",
  207: "MULTI_STATUS",
  208: "ALREADY_REPORTED",
  226: "IM_USED",
  300: "MULTIPLE_CHOICES",
  301: "MOVED_PERMANENTLY",
  302: "FOUND",
  303: "SEE_OTHER",
  304: "NOT_MODIFIED",
  305: "USE_PROXY",
  307: "TEMPORARY_REDIRECT",
  308: "PERMANENT_REDIRECT",
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  402: "PAYMENT_REQUIRED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  405: "METHOD_NOT_ALLOWED",
  406: "NOT_ACCEPTABLE",
  407: "PROXY_AUTHENTICATION_REQUIRED",
  408: "REQUEST_TIMEOUT",
  409: "CONFLICT",
  410: "GONE",
  411: "LENGTH_REQUIRED",
  412: "PRECONDITION_FAILED",
  413: "PAYLOAD_TOO_LARGE",
  414: "URI_TOO_LONG",
  415: "UNSUPPORTED_MEDIA_TYPE",
  416: "RANGE_NOT_SATISFIABLE",
  417: "EXPECTATION_FAILED",
  418: "IM_A_TEAPOT",
  421: "MISDIRECTED_REQUEST",
  422: "UNPROCESSABLE_ENTITY",
  423: "LOCKED",
  424: "FAILED_DEPENDENCY",
  425: "TOO_EARLY",
  426: "UPGRADE_REQUIRED",
  428: "PRECONDITION_REQUIRED",
  429: "TOO_MANY_REQUESTS",
  431: "REQUEST_HEADER_FIELDS_TOO_LARGE",
  451: "UNAVAILABLE_FOR_LEGAL_REASONS",
  500: "INTERNAL_SERVER_ERROR",
  501: "NOT_IMPLEMENTED",
  502: "BAD_GATEWAY",
  503: "SERVICE_UNAVAILABLE",
  504: "GATEWAY_TIMEOUT",
  505: "HTTP_VERSION_NOT_SUPPORTED",
  506: "VARIANT_ALSO_NEGOTIATES",
  507: "INSUFFICIENT_STORAGE",
  508: "LOOP_DETECTED",
  510: "NOT_EXTENDED",
  511: "NETWORK_AUTHENTICATION_REQUIRED"
};

export function getHttpStatus(code: number): string {
  return HTTPSTATUSCODE[code] || 'SERVER_ERROR';
}

export const MULTER_ERRORS: Record<string, { message: string; statusCode: number }> = {
  LIMIT_FILE_SIZE: {
    message: "File size must not exceed 3MB",
    statusCode: 413
  },
  LIMIT_FILE_COUNT: {
    message: "Too many files uploaded, maximum 10 files allowed at once",
    statusCode: 422
  },
  LIMIT_UNEXPECTED_FILE: {
    message: "Unexpected file field",
    statusCode: 422
  },
    INVALID_FILE_TYPE: {
    message: "Invalid file type",
    statusCode: 422
  }
};


/* database error codes */
export const DATABASE_ERRORS: Record<string, { message: string; statusCode: number }> = {
  /* MySQL Error Codes */
  'ER_DUP_ENTRY': { message: 'Duplicate entry exists', statusCode: 409 },
  'ER_NO_REFERENCED_ROW': { message: 'Referenced record does not exist', statusCode: 404 },
  'ER_ROW_IS_REFERENCED': { message: 'Record is referenced by other records', statusCode: 409 },
  'ER_DATA_TOO_LONG': { message: 'Data too long for column', statusCode: 400 },
  'ER_BAD_NULL_ERROR': { message: 'Column cannot be null', statusCode: 400 },
  'ER_NO_DEFAULT_FOR_FIELD': { message: 'Field does not have a default value', statusCode: 400 },
  'ER_ACCESS_DENIED_ERROR': { message: 'Database access denied', statusCode: 500 },
  'ER_BAD_DB_ERROR': { message: 'Database does not exist', statusCode: 500 },
  'ER_TABLE_EXISTS_ERROR': { message: 'Table already exists', statusCode: 409 },
  'ER_NO_SUCH_TABLE': { message: 'Table does not exist', statusCode: 404 },
  'ER_LOCK_WAIT_TIMEOUT': { message: 'Lock wait timeout exceeded', statusCode: 408 },
  'ER_LOCK_DEADLOCK': { message: 'Deadlock found', statusCode: 409 },

  /* PostgreSQL Error Codes */
  // '23505': { message: 'Duplicate key value violates unique constraint', statusCode: 409 },
  '23505' : {message: 'This record already exists', statusCode: 409},
  // '23503': { message: 'Foreign key violation', statusCode: 404 },
  '23503' : {message:'The related item you selected could not be found.',statusCode: 404},
  // '23502': { message: 'Not null violation', statusCode: 400 },
  '25502': {message :'The field you are trying to save cannot be null.',statusCode: 400},
  // '23514': { message: 'Check constraint violation', statusCode: 400 },
  '23514' : {message : 'Some information is not valid.',statusCode: 400},
  '25P02': { message: 'Transaction aborted', statusCode: 500 },
  // '40P01': { message: 'Deadlock detected', statusCode: 409 },
  '40P01': { message: 'The system is busy right now. Please try again in a moment.', statusCode: 503 },
  '28000': { message: 'Invalid authorization specification', statusCode: 500 },
  '28P01': { message: 'Invalid password', statusCode: 500 },
  '3D000': { message: 'Database does not exist', statusCode: 500 },
  '42501': { message: 'Insufficient privilege', statusCode: 403 },
};
