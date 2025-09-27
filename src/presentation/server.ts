import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from '../domain/use-cases/email/send-logs';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

const mailerService = new EmailService()

export class Server {

    public static start() {

        console.log("Server started...");

       /*  mailerService.sendEmail({
            to:'mogmarino@hotmail.com',
            subject: 'Realizando pruebas APP NOC',
            htmlBody:`
                <h3>PRUEBAS EN LAS APP NOC CON NODE...</h3>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            `
        }) */

            //  ENVIO DE MAILS DE MANERA DIRECTA CON EL SERVICIO
           /*  mailerService.sendEmailWithLogs([
                'marcelo.marino@andessalud.ar',
                'mogmarino@hotmail.com'
            ]) */

        //ENVIO DE MAILS CON UN CASO DE USO
        new SendEmailLogs(
            mailerService,
            fileSystemLogRepository
        ).execute([
            'marcelo.marino@andessalud.ar',
            'mogmarino@hotmail.com'
        ])

        

        return
        CronService.createJob(
            '*/4 * * * * *',
            () => {
                const date = new Date().toDateString()
                console.log(`Cada 4 segundos - ${date}`);
                const url = 'http://localhost:3000/posts'
                new CheckService(
                    fileSystemLogRepository,
                    () => {console.log(`${url} is ok`)},
                    (error) => {console.log(error)}
                ).execute(url)

                // creacion de la instancia con los argumentos opcionales
               /*  new CheckService(
                    fileSystemLogRepository,
                    undefined, 
                    undefined
                ) */
                
            }
        )
        
    }
}