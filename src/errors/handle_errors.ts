import { Response } from "express";

type ResponseApiType = {
    success: boolean;
    message: string;
    errors?: any[];
};

export class AppError extends Error {
    public errors: any[];
    public statusCode: number;

    constructor(message: string, statusCode: number = 400, errors: any[] = []) {
        super(message);
        this.errors = errors;
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export const handlerAnyError = (
    error: unknown,
    res: Response<ResponseApiType>
) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errors: error.errors
        });
    }

    console.error("[Unhandled Error]", error);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};

export default {
    AppError,
    handlerAnyError 
};