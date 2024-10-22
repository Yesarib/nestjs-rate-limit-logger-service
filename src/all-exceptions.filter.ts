import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { LoggerService } from "./logger/logger.service";

type ResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new LoggerService(AllExceptionsFilter.name);

    catch(exception: any, host: ArgumentsHost): void {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();

        const responseObj: ResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: ''
        }

        if (exception instanceof HttpException) {
            responseObj.statusCode = exception.getStatus()
            responseObj.response = exception.getResponse()
        } else {
            responseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            responseObj.response = 'Internal Server Error'
        }

        response
            .status(responseObj.statusCode)
            .json(responseObj)

        this.logger.error(responseObj.response, AllExceptionsFilter.name)

        super.catch(exception, host)
    }
}