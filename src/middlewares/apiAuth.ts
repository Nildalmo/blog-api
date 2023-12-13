
import { NextFunction, Request, Response } from 'express';
import { UnathorizedException } from '../exceptions/UnauthorizeException';
import { UserService } from './../services/UserService';

export const apiAuth = async (
    request: any,
    response:Response, 
    next: NextFunction
    ) => {
 const authorization = request.headers.authorization;
 if(authorization == null || !authorization.startsWith("Bearer")) {
    next(new UnathorizedException("Acesso não autorizado"));
 }
 const token = authorization?.split(" ")[1];

 try {
    const userService: UserService = new UserService();
    const {email} = UserService.verifyToken(token as string);
    const user = UserService.getUserByEmail(email);
    request.user = user;
    next();
 } catch (error) {
    next(error);

    };
 }
