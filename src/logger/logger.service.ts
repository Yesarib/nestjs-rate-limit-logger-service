import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { promises as fsPromises } from 'fs';
import * as path from 'path'

@Injectable()
export class LoggerService extends ConsoleLogger {
    async logToFile(entry: any, logType?: string) {
        const formattedEntry = `${Intl.DateTimeFormat('tr-TR', {
            dateStyle: 'short',
            timeStyle: 'short',
        }).format(new Date())}\t${entry}\n`

        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'))
            }
            if (logType === 'special') {
                await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'specialLogFile.log'), formattedEntry)
            }
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'logFile.log'), formattedEntry)
        } catch (error) {
            if (error instanceof Error) console.error(error.message)
        }
    }
    log(message: any, context?: string) {
        const entry = `${context}\t${message}`
        this.logToFile(entry)

        super.log(message, context)
    }

    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`
        this.logToFile(entry)

        super.error(message, stackOrContext)
    }

    specialLog(message: any, context?: string) {
        const entry = `${context}\t${message}`
        this.logToFile(entry, 'special')

        super.log(message, context)
    }
}
