import { Request, Response } from "express";
import { asyncHandler } from "../../../common/errors/async-handler.errors.js";
import { ICreateProduct } from "../schemas/product.schemas.js";
import { ApiResponse } from "../../../common/utils/api-response.utils.js";
import { ProductService } from "../services/product.services.js";

export class ProductController{

    constructor(
        private readonly service: ProductService
    ) {}

    createProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
      const { ...productData }: ICreateProduct = req.body;
      const response = await this.service.create(productData);
      ApiResponse.success(res, { statusCode: 200, message: "Product created", data: { product: response } });
    
  }); 
}