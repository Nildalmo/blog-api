import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "@prisma/client";
import { request } from 'http';
import { PasswordEncoder } from "../services/PasswordEncoder";
import { UnathorizedException } from "../exceptions/UnauthorizeException";
import { NotFoundException } from "../exceptions/NotFoundException";

const userService: UserService = new UserService();
export const getUsers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users: User[] = await userService.getUsers();
  return response.status(200).json(users);
};

export const getUser = async (
  request: Request,
  response: Response, next: NextFunction
): Promise<Response | void> => {
  const id: string = request.params.id;
  try {
     const user: User = await userService.getUserById(id);

    return response.status(200).json(user);
  } catch (error:any){
    next(error);
  }
     
  };


export const saveUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
 
  const data = request.body;
  const birthDateArray = data.birthDate.split("-");

  data.birthDate = new Date(
    birthDateArray[0],
    birthDateArray[1] - 1,
    birthDateArray[2]
  );

  const user: User = await userService.createUser(data);
  return response.status(201).json(user);
};

export const login = async (
  request:Request,
  response:Response,
  next:NextFunction
  ) => {
    const passwordEncoder: PasswordEncoder = new PasswordEncoder();
    
    const {email, password} = request.body;

    try {
      const user = await userService.getUserByEmail(email);

      const isPasswordValid = await passwordEncoder.matches(
        password,
        user.password
        );
        console.log(isPasswordValid,password)
      if (isPasswordValid) {
        return response.status(200).json({
          type: "Bearer",
          token: userService.signToken(user),
        });

      } console.log(user)
      next(new UnathorizedException("Usuárrio e/ou senha inválidos"));
    }catch(error: any) { console.log(error)
      if(error instanceof NotFoundException){
        next(new UnathorizedException("Usuárrio e/ou senha inválidos"));
      }
      next(error);
    }
    
  };
