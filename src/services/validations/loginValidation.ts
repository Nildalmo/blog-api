import { Schema } from "express-validator";

export const loginvalidation:Schema = {
    email:{
        isEmail:true,
        notEmpty:true,
        errorMessage: "Email inválida",
    },
    password: {
        notEmpty:true,
        errorMessage: "Senha inválida",
        isLength:{
            options: {
                min: 8,
            },
        },
    },
};