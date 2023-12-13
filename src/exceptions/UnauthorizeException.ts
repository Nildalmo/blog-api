import { HttpError } from "./HttpError";

export class UnathorizedException extends HttpError{
    constructor(message: string){
        super(message, 401);
    }
}