import { LogEntity, LogSeverityLevel } from "./log.entity"


describe('log.entity.test.ts',() => {

    const dataObj = {
        origin: 'log.entity.test.ts',
        level: LogSeverityLevel.low,
        message: 'Test log entity'
    }


    test('should create a LogEntity instance',() => {

     
        const newLog = new LogEntity(dataObj)

        expect(newLog).toBeInstanceOf(LogEntity)
        expect(newLog).toEqual(expect.objectContaining({
            ...dataObj,
            createdAt: expect.any(Date)
        }))
    })

    test('should create a LogEntity from json',() => {

        const json = `{"level":"high","message":"http://localhost:3000/posts is not ok. TypeError: fetch failed","createdAt":"2025-10-06T10:30:20.062Z","origin":"check-service.ts"}`

        const log = LogEntity.fromJson(json)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log).toEqual(expect.objectContaining({
            level: LogSeverityLevel.high,
            message: 'http://localhost:3000/posts is not ok. TypeError: fetch failed',
            createdAt: new Date('2025-10-06T10:30:20.062Z'),
            origin: 'check-service.ts'
        }))
    })


    test('should create a LogEntity from object',() => {

        const log = LogEntity.fromObject({
            ...dataObj,
            createdAt: new Date()
        })

        expect(log).toBeInstanceOf(LogEntity)
        expect(log).toEqual(expect.objectContaining({
            ...dataObj,
            createdAt: expect.any(Date)
        }))
    })
})