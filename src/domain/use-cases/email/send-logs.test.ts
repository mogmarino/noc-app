import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository"
import { SendEmailLogs } from './send-logs';


describe('send-logs.test.ts', () => {

    const mockEmailService = {
        sendEmailWithLogs: jest.fn(),
    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    )

    test('should log an error', async () => {

       

        const result = await sendEmailLogs.execute('mogmarino@gmail.com')

        expect(result).toBe(false)
        expect(mockEmailService.sendEmailWithLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "high",
            message: "Error: Email logs not sent",
            origin: "send-logs.ts",
        })


    })


    test('should call sendEmail and saveLog', async () => {
        mockEmailService.sendEmailWithLogs = jest.fn().mockResolvedValue(true)

        const result = await sendEmailLogs.execute('mogmarino@gmail.com')

        expect(result).toBe(true)
        expect(mockEmailService.sendEmailWithLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Email logs sent correctly",
            origin: "send-logs.ts",
        })


    })
})