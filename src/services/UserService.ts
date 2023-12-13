import { PrismaClient, User } from "@prisma/client";
import { PasswordEncoder } from './PasswordEncoder';
import { NotFoundException } from "../exceptions/NotFoundException";
import * as jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

interface StoreUser extends Omit<User, "id" | "createdAt" | "updatedAt"> {}
interface UpdateUSer extends Partial<User>{}
interface PayloadJwt{
    iat:number;
    jti:string;
    sub:string;
    email:string;
    exp:number;

}

export class UserService{
    static getUserByEmail(email: any) {
        throw new Error('Method not implemented.');
    }
    static verifyToken(arg0: string): { email: any; } {
        throw new Error('Method not implemented.');
    }
    private readonly passwordEncoder: PasswordEncoder;
    private readonly prisma: PrismaClient;
            
    constructor() {
        this.passwordEncoder = new PasswordEncoder();
        this.prisma = new PrismaClient();
    }

    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
    async createUser(data:StoreUser): Promise<User> {
        data.password = await this.passwordEncoder.encode(data.password);
        return this.prisma.user.create({data});
    }

    async getUserById(id: string): Promise<User> {
    const user:User | null = await this.prisma.user.findFirst({
        where:{
            id,
        },
    });
if (!user) {
    throw new NotFoundException("Usuário não encontrado!");
}
    return user;
    }
    async getUserByEmail(email: string): Promise<User> {
        const user:User | null = await this.prisma.user.findFirst({
            where:{
                email,
            },
        })
        if(!user) {
            throw new NotFoundException("Usuário não encontrado!");
        }
        return user;
    }
    async updateUser(id: string, data: UpdateUSer): Promise<User> {
        const user:User = await this.prisma.user.update({
            where: {
                id,
            },
            data,
            });
            return user;
        }
        async deleteUser(id: string): Promise<void> {
            await this.prisma.user.delete({
                where: {
                    id,
                },
            });
        } 

     signToken(user: User): string {
            return jwt.sign(
                {
                jti: randomUUID(),
                sub: user.id,
                iat: Math.floor(Date.now() / 1000)-3,
                email: user.email,
            },
             process.env.JWT_SECRET as string,
             {
                expiresIn: `${process.env.JWT_EXPIRATION}h`,
             }
            );
        }
        verifyToken(token: string):PayloadJwt{
            return jwt.verify(token, process.env.JWT_SECRET as string) as PayloadJwt;
        }
    }
