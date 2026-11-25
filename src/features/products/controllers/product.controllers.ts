import { Request, Response } from "express";
import { asyncHandler } from "../../../common/errors/async-handler.errors.js";
import { ICreateProduct, IUpdateProduct } from "../validations/product.validations.js";
import { ApiResponse } from "../../../common/utils/api-response.utils.js";
import { ProductService } from "../services/product.services.js";
import { FullQueryInterface } from "../../../common/schemas/query.schemas.js";

export class ProductController {

    constructor(private readonly service: ProductService) { }

    createProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { ...productData }: ICreateProduct = req.body;
        const product = await this.service.create(productData);
        ApiResponse.success(res, { statusCode: 201, message: "Product created", data:product,variable:"product" });
    });

    getAllProducts = asyncHandler(async(req:Request,res:Response):Promise<any>=>{
        const query = req.query as FullQueryInterface;
        const {data,pagination} =await this.service.getAllProducts(query);
        ApiResponse.success(res,{statusCode:200,message:'Product fethed',data:data,variable: "products",pagination})
    })

    getProductDetail = asyncHandler(async(req:Request,res:Response):Promise<any>=>{
        const {id} = req.params
        const product = await this.service.getProductDetail(id as string);
        ApiResponse.success(res,{statusCode:200,message:'Product fethed',data:product,variable: "product"})
    })

    updateProduct = asyncHandler(async (req:Request,res:Response):Promise<any>=>{
        const {...productData}:IUpdateProduct = req.body;
        const {id} = req.params;
        const product = await this.service.update(productData,id as string)
        ApiResponse.success(res, {statusCode:200,message:'Product Updated', data:{product}})
    });

    deleteProduct = asyncHandler(async (req:Request,res:Response):Promise<any>=>{
        const {id} = req.params;
        await this.service.delete(id as string)
        ApiResponse.success(res, {statusCode:200,message:'Product Deleted'})
    });

    getAllProductsList = asyncHandler(async(req:Request,res:Response):Promise<any>=>{
        const query = req.query as FullQueryInterface;
        const {data,pagination} =await this.service.getAllProductsList(query);
        ApiResponse.success(res,{statusCode:200,message:'Product fethed',data:data,variable: "products",pagination})
    })
}