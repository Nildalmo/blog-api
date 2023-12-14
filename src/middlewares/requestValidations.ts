import { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";
import { request } from "http";

export const requestValidation = (validationSchema: any) => {
  return async (request: Request, response: Response, next: NextFunction) => {
        const validations = await checkSchema(validationSchema).run(request);
        
        const errosArray = [];
        for(let validation of validations){
            if(validation.isEmpty()) {
                continue;
            }
            errosArray.push(
                ...validation.array().map((inputFail:any) =>{
                return {
                    error: inputFail.msg,
                    path: inputFail.path,
                };
            })
        );
    }

        if(errosArray.length > 0) {
            return response.status(422).json({
                message: "Tá viajando parça?",
                erros: errosArray,
            });
        }
        next();
    };
}