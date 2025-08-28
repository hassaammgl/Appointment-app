import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from './AppError';

type ServiceFunction<T = any> = (...args: any[]) => Promise<T>;

interface DatabaseError extends Error {
    code?: number;
    name: string;
}

interface HandleRequestParams<T = any> {
    req: Request;
    res: Response;
    next: NextFunction;
    service: ServiceFunction<T>;
    serviceArgs?: any[];
    successStatus?: number;
    successMessage?: string;
}

interface ApiResponse {
    message: string;
    success?: boolean;
    [key: string]: any;
}

export class RequestHandler {
    public async handleRequest<T = any>({
        req,
        res,
        next,
        service,
        serviceArgs = [],
        successStatus = 200,
        successMessage = 'Success',
    }: HandleRequestParams<T>): Promise<void> {
        try {
            try {
                const result = await service(...serviceArgs);
                if (!result) throw new AppError('Operation failed', 500);

                const responseData: ApiResponse = {
                    message: successMessage,
                    ...(typeof result === 'object' ? result : { success: true }),
                };

                res.status(successStatus).json(responseData);
            } catch (dbError: unknown) {
                const error = dbError as DatabaseError;
                if (error.code === 11000) {
                    throw new ValidationError('Duplicate key error in DB 🚨');
                } else if (error.name === 'MongoError') {
                    throw new AppError('Database error occurred', 500);
                }
                throw dbError;
            }
        } catch (err: unknown) {
            next(err);
        }
    }
}

// Export singleton instance
export const requestHandler = new RequestHandler();

// Export the method for backward compatibility
export const handleRequest = requestHandler.handleRequest.bind(requestHandler);