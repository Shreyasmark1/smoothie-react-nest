import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { FileLoggerService } from "../logging/file-logger.service";
import { Observable, tap } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { DirNames, FileNames } from "src/utils/constants";


export class RequestTrackingInterceptor implements NestInterceptor {

    constructor(private readonly fileLoggerService: FileLoggerService) { }

    configService = new ConfigService()

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {

        const request = context.switchToHttp().getRequest();
        const statusCode = context.switchToHttp().getRequest().statusCode;

        return next.handle().pipe(
            tap((response) => {
                if (this.configService.get('REQUEST_RESPONSE_LOGGING') === 'true') {
                    const currentDate = new Date().toISOString().split('T')[0]
                    const directoryPath = this.fileLoggerService.createLogDirectory(DirNames.REQUEST_TRACKER + currentDate)
                    const logMessage = `Request: ${JSON.stringify(request.body)}
                     \t | Response: ${JSON.stringify(response)}
                     \t | statuCode: ${statusCode}`
                     this.fileLoggerService.log(logMessage,directoryPath,FileNames.REQUEST_TRACKER)
                }
            })
        )
    }
}