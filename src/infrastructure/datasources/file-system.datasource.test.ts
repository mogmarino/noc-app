import path from "path"
import fs from 'fs'
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { log } from "console";


describe('file-system.datasource.test.ts',() => {

    const logPath = path.join(__dirname, '../../../logs')


    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true })
    })

    test('should create log files if they dont exists', () => {

        new FileSystemDatasource()
        const files = fs.readdirSync(logPath)


        expect(files).toEqual([
            'logs-all.log',
            'logs-high.log',
            'logs-medium.log'
        ])
        
    })

    
    test('sould save log in logs-all.log', () => {
        const logDatasourde = new FileSystemDatasource()

        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'any_message',
            origin: 'any_origin',
        })

        logDatasourde.saveLog(log)

        const allLogsContent = fs.readFileSync(path.join(logPath, 'logs-all.log'), 'utf-8')

        expect(allLogsContent).toContain(JSON.stringify(log))

    })

    test('sould save log in logs-all.log and logs-medium.log', () => {
        const logDatasourde = new FileSystemDatasource()


        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'any_message medium',
            origin: 'any_origin',
        })

        logDatasourde.saveLog(log)

        const allLogsContent = fs.readFileSync(path.join(logPath, 'logs-all.log'), 'utf-8')
        const mediumLogsContent = fs.readFileSync(path.join(logPath, 'logs-medium.log'), 'utf-8')


        expect(allLogsContent).toContain(JSON.stringify(log))
        expect(mediumLogsContent).toContain(JSON.stringify(log))


    })

     test('sould save log in logs-all.log and logs-high.log', () => {
        const logDatasourde = new FileSystemDatasource()


        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'any_message high',
            origin: 'any_origin',
        })

        logDatasourde.saveLog(log)

        const allLogsContent = fs.readFileSync(path.join(logPath, 'logs-all.log'), 'utf-8')
        const highLogsContent = fs.readFileSync(path.join(logPath, 'logs-high.log'), 'utf-8')


        expect(allLogsContent).toContain(JSON.stringify(log))
        expect(highLogsContent).toContain(JSON.stringify(log))


    })

    test('should get all logs', async () => {

         const logDatasourde = new FileSystemDatasource()


        const logLow = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'any_message low',
            origin: 'any_origin',
        })

        const logMedium = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'any_message medium',
            origin: 'any_origin',
        })

        const logHigh = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'any_message high',
            origin: 'any_origin',
        })




        await logDatasourde.saveLog(logLow)
        await logDatasourde.saveLog(logMedium)
        await logDatasourde.saveLog(logHigh)

        const allLogs = await logDatasourde.getLogs(LogSeverityLevel.low)
        const mediumLogs = await logDatasourde.getLogs(LogSeverityLevel.medium)
        const highLogs = await logDatasourde.getLogs(LogSeverityLevel.high)

        expect(allLogs).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]))
        expect(mediumLogs).toEqual(expect.arrayContaining([logMedium]))
        expect(highLogs).toEqual(expect.arrayContaining([logHigh]))
    })


    test('should return if path exist', () => {

        new FileSystemDatasource()
        new FileSystemDatasource()

        expect(true).toBe(fs.existsSync(logPath))
    })

    test('should throw an error if severity level not implemented', async () => {
        const logDatasourde = new FileSystemDatasource()

        const customSeverityLevel = 'SARASA' as LogSeverityLevel

        try {
            await logDatasourde.getLogs(customSeverityLevel)
            expect(true).toBe(false)
        } catch (error) {
            const errorString =  `${error}`
            console.log(errorString);

            expect( errorString).toBe(`Error: ${customSeverityLevel} not implemented`)
            
        }
    })

    
})