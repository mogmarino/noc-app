import mongoose from 'mongoose';
import { envs } from '../../config/plugins/envs.plugin';
import { MongoDatabase } from '../../data/mongo/init';
import { MongoLogDatasource } from './mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogModel } from '../../data/mongo';


describe('mongo-log.datasource.test.ts', () => {

    const logDataSource = new MongoLogDatasource()

    const log = new  LogEntity ({
        level: LogSeverityLevel.medium,
        message: "Test log",
        origin: "mongo-log.datasource.test.ts",
    })


    beforeAll(async () => {
        MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })

    afterEach(async () => {
        await LogModel.deleteMany({})
    })

    afterAll(() => {
        mongoose.connection.close();
    })

    test('should create a log', async () => {

        const logSpy = jest.spyOn(console, 'log')
      
        await logDataSource.saveLog(log)

        expect(logSpy).toHaveBeenCalledTimes(1)
        expect(logSpy).toHaveBeenCalledWith('Mongo Log created: ', expect.any(String))

    })

    test('should get logs by severity level', async () => {

        await logDataSource.saveLog(log)
        await logDataSource.saveLog(log)


        const logs = await logDataSource.getLogs(LogSeverityLevel.medium)

        expect(logs).toBeInstanceOf(Array)
        expect(logs.length).toBe(2)
        expect(logs[0].level).toBe(LogSeverityLevel.medium)
    })
    
})