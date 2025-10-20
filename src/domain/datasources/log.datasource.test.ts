import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDatasource } from './log.datasource';


describe('log.datasource.test.ts', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        level: LogSeverityLevel.low,
        message: 'Test log datasource'
    })

    class MockLogDatasource implements LogDatasource {

        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }
    }

    test('should test the abstract class', async () => {

        const mockLogDatasource = new MockLogDatasource()

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource)
        expect(typeof mockLogDatasource.getLogs).toBe('function')
        expect(typeof mockLogDatasource.saveLog).toBe('function')

        await mockLogDatasource.saveLog(newLog)
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.low)

        expect(logs).toEqual([newLog])
        expect(logs[0]).toBeInstanceOf(LogEntity)
        expect(logs.length).toBe(1)
    })
})