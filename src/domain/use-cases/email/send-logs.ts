import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"


interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase{

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}

    async execute (to: string | string[]): Promise<boolean> {

        try {
            const sent = await this.emailService.sendEmailWithLogs(to)

            

            if(!sent)
                throw new Error('Email logs not sent')

            const log = new LogEntity({
                origin: 'send-logs.ts',
                message: `Email logs sent correctly`,
                level: LogSeverityLevel.low
            })
            this.logRepository.saveLog(log)

            return true
        } catch (error) {

            const log = new LogEntity({
                origin: 'send-logs.ts',
                message: `${error}`,
                level: LogSeverityLevel.high
            })
            this.logRepository.saveLog(log)

            return false
        }

    }
}