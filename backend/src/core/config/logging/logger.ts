import { ConsoleLogger } from '@nestjs/common';
import { FileLoggerService } from './file-logger.service';
import { DirNames, FileNames } from 'src/utils/constants';

export class MyLogger extends ConsoleLogger {

    constructor(private readonly fileLoggerService: FileLoggerService){
        super()
    }

    log(message: any, context?: string) {
        this.logToFile(context, message, 'LOG')
        super.log(message, context )
    }

    error(message: any, context?: string) {
        this.logToFile(context, message, 'ERROR')
        this.logError(context, message, 'ERROR')
        super.error(message, context)
    }

    warn(message: any,context?: string) {
        this.logToFile(context, message, 'WARN')
        super.warn(message, context)
    }

    debug(message: any, context?: string) {
        this.logToFile(context, message, 'DEBUG')
        super.debug(message, context)
    }

    verbose(message: any, context?: string) {
        this.logToFile(context, message, 'VERBOSE')
        super.verbose(message, context)
    }
    
    logToFile(context: string, message: string,level: string){
        const currentDate = new Date().toISOString().split('T')[0]
        const directoryPath = this.fileLoggerService.createLogDirectory(DirNames.APP_LOG + currentDate)
        const logMessage = `${new Date().toISOString()} ${context} ${level} ${message}`
        this.fileLoggerService.log(logMessage,directoryPath,FileNames.APP_LOG)
    }
    
    logError(context: string, message: string,level: string){
        const currentDate = new Date().toISOString().split('T')[0]
        const directoryPath = this.fileLoggerService.createLogDirectory(DirNames.ERROR_LOG + currentDate)
        const logMessage = `${new Date().toISOString()} ${context} ${level} ${message}`
        this.fileLoggerService.log(logMessage,directoryPath,FileNames.ERROR_LOG)
    }

}








