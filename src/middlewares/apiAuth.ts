
import { NextFunction, Request, Response } from 'express';
import { UnathorizedException } from '../exceptions/UnauthorizeException';
import { UserService } from './../services/UserService';

export const apiAuth = async (
    request: any,
    response:Response, 
    next: NextFunction
    ) => {
 const authorization = request.headers.authorization;

if(authorization ==null ||typeof authorization == 'undefined'){
   next(new UnathorizedException("Acesso não autorizado!"));
}
 const headerArray = authorization.split(" ");
if (headerArray[0] !=="Bearer"){
   next(new UnathorizedException("Acesso não autorizado!"));
   
} console.log(headerArray)
const token = headerArray[1];
 if (!token){
   next(new UnathorizedException("Acesso não autorizado!"));
 }

 try {
    const userService: UserService = new UserService();
    const {email} = userService.verifyToken(token as string);
    const user = userService.getUserByEmail(email);
    request.user = user;
    next();
 } catch (error: any){
   next(new UnathorizedException(error.message));
    }
 };
