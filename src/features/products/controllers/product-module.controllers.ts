import { Request, Response } from "express";
import { asyncHandler } from "../../../common/errors/async-handler.errors.js";
import { ApiResponse } from "../../../common/utils/api-response.utils.js";
import { ProducModuletService } from "../services/product-module.services.js";
import { ICreateProductModule, IUpdateProductModule } from "../validations/product-module.validations.js";

export class ProductModuleController {

    constructor(private readonly productModuleService: ProducModuletService) { }

    createProductModule = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const {id} = req.params;
        const { ...moduleData }: ICreateProductModule = req.body;
        const productModule = await this.productModuleService.createProductModule(id as string,moduleData);
        ApiResponse.success(res, { statusCode: 201, message: "Product Module created", data:productModule,variable:"productModules" });
    });

    getProductModules = asyncHandler(async(req:Request,res:Response):Promise<any>=>{
        const {id} = req.params
        const productModule = await this.productModuleService.getProductModule(id as string);
        ApiResponse.success(res,{statusCode:200,message:'Product Module fethed',data:productModule,variable: "productModules"})
    })

    updateProductModule = asyncHandler(async (req:Request,res:Response):Promise<any>=>{
        const {...moduleData}:IUpdateProductModule = req.body;
        const {id} = req.params;
        const productModule = await this.productModuleService.updateProducyModule(id as string,moduleData)
        ApiResponse.success(res, {statusCode:200,message:'Product Updated', data:{productModule}})
    });

}