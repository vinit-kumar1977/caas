import {
    createProductSchema,
    updateProductSchema,
    productIdSchema,
    // productListQuerySchema,
} from "../schemas/product.schemas.js";

import { validateRequest } from "../../../common/middlewares/validations/index.js";

export const validateCreateProduct = validateRequest({
    body: createProductSchema,
});

export const validateUpdateProduct = validateRequest({
    params: productIdSchema,
    body: updateProductSchema,
});

export const validateGetProduct = validateRequest({
    params: productIdSchema,
});

// export const validateProductList = validateRequest({
//     query: productListQuerySchema,
// });