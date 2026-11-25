import { Request, Response } from "express";
import { asyncHandler } from "../../../common/errors/async-handler.errors.js";
import { ApiResponse } from "../../../common/utils/api-response.utils.js";
import { FullQueryInterface } from "../../../common/schemas/query.schemas.js";
import { ICreateModule, IUpdateModule } from "../validations/module.validations.js";
import { ModuleService } from "../services/module.services.js";

export class ModuleController {

    constructor(private readonly service: ModuleService) { }

    createModule = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { ...moduleData }: ICreateModule = req.body;
        const module = await this.service.createModule(moduleData);
        ApiResponse.success(res, { statusCode: 201, message: "Module created", data:module,variable:"module" });
    });

    getAllModules = asyncHandler(async(req:Request,res:Response):Promise<any>=>{
        const query = req.query as FullQueryInterface;
        const {data,pagination} =await this.service.getAllModules(query);
        ApiResponse.success(res,{statusCode:200,message:'Module fethed',data:data,variable: "modules",pagination})
    })

    getModuleDetail = asyncHandler(async(req:Request,res:Response):Promise<any>=>{
        const {id} = req.params;
        const module = await this.service.getModuleById(id as string);
        ApiResponse.success(res,{statusCode:200,message:'Module fethed',data:module,variable: "module"})
    });

    updateModule = asyncHandler(async (req:Request,res:Response):Promise<any>=>{
        const {...moduleData}:IUpdateModule = req.body;
        const {id} = req.params;
        const module = await this.service.update(moduleData,id as string)
        ApiResponse.success(res, {statusCode:200,message:'Module Updated', data:{module}})
    });

    deleteModule = asyncHandler(async (req:Request,res:Response):Promise<any>=>{
        const {id} = req.params;
        await this.service.delete(id as string)
        ApiResponse.success(res, {statusCode:200,message:'Module Delete'})
    });

    getAllModulesList = asyncHandler(async(req:Request,res:Response):Promise<any>=>{
        const query = req.query as FullQueryInterface;
        const {data,pagination} =await this.service.getAllProductsList(query);
        ApiResponse.success(res,{statusCode:200,message:'Module fethed',data:data,variable: "modules",pagination})
    })
}