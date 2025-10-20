import { envs } from "./envs.plugin";


describe('envs.plugin.ts', () => {

    test('should return envs options', () => {

        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'mogmarino@gmail.com',
            MAILER_SECRET_KEY: 'tzknoryzepfvwpck',
            PROD: false,
            MONGO_URL: 'mongodb://marcelo:987123@localhost:27020/',
            MONGO_DB_NAME: 'NOC-test',
            MONGO_USER: 'marcelo',
            MONGO_PASS: '987123',
            POSTGRES_DB: "NOC-test",
            POSTGRES_PASSWORD: "987123",
            POSTGRES_URL: "postgresql://postgres:987123@localhost:5435/NOC-test?schema=public",
            POSTGRES_USER: "postgres",

        })  

            
    })

    test('should return error if not found env', async () => {
        jest.resetModules()
        process.env.PORT = 'ajlfdkajdslkf'
        try{
            await import ('./envs.plugin')
            expect(true).toBe(false)

        }catch(error){
            console.log(error);
        }
    })
})

