import { ConsoleLogger } from '@nestjs/common';
import { APP_LOG_PATH, ERR_LOG_PATH } from 'src/utils/constants';
const fs = require('fs');


export class MyLogger extends ConsoleLogger {

    log(message: any, ...optionalParams: [...any, string?]) {
        writeLog(optionalParams, message, 'INFO')
        super.log(message, optionalParams)
    }

    error(message: any, ...optionalParams: [...any, string?, string?]) {
        writeLog(optionalParams, message, 'ERROR')
        writeError(optionalParams, message)
        super.error(message, optionalParams)
    }

    warn(message: any, ...optionalParams: [...any, string?]) {
        writeLog(optionalParams, message, 'WARN')
        super.warn(message, optionalParams)
    }

    debug(message: any, ...optionalParams: [...any, string?]) {
        writeLog(optionalParams, message, 'DEBUG')
        super.debug(message, optionalParams)
    }

    verbose(message: any, ...optionalParams: [...any, string?]) {
        writeLog(optionalParams, message, 'VERBOSE')
        super.verbose(message, optionalParams)
    }

}

export const writeError = (context: any, message: string) => {
    const content = `[${new Date().toISOString()}]    ERROR       ${JSON.stringify(context)}     ${message}`
    writeToLog(ERR_LOG_PATH, content)
}

export const writeLog = (context: any, message: string, level: string) => {
    const content = `[${new Date().toISOString()}]     ${level}      ${JSON.stringify(context)}  ${message}`
    writeToLog(APP_LOG_PATH, content)
}


export const writeToLog = (path:string, content:any) => {
    if (fs.existsSync(path)) {
        fs.appendFile(path, content + '\n', err => {
            if (err) {
                console.error(err);
            }
        });
    } else {

        content = `      Date                    Level         Context              Message   \n` + content

        fs.appendFile(path, content + '\n', err => {

            if (err) {
                console.error(err);
            }

        });
    }
}