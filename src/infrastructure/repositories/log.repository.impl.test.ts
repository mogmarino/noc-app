import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
import { LogRepositoryImpl } from './log.repository.impl'

describe('log.repository.impl.test.ts', () => {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const logRepository = new LogRepositoryImpl(mockLogDatasource)

    beforeAll(() => {
        jest.clearAllMocks()
    })

    test('should call logDatasource saveLog with arguments', async () => {
        const log: LogEntity = { level: LogSeverityLevel.low, message: 'any_message', origin: 'any_origin', createdAt: new Date() }
        await logRepository.saveLog(log)
        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log)

    })


    test('should call logDatasource getLogs with arguments', async () => {

        const severityLevel = LogSeverityLevel.medium
        await logRepository.getLogs(severityLevel)
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(severityLevel)
        
    })
})