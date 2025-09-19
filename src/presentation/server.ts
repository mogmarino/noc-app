import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {

    public static start() {

        console.log("Server started...");

        CronService.createJob(
            '*/4 * * * * *',
            () => {
                const date = new Date().toDateString()
                console.log(`Cada 4 segundos - ${date}`);
                const url = 'http://localhost:3000/posts'
                new CheckService(
                    () => {console.log(`${url} is ok`)},
                    (error) => {console.log(error)}
                ).execute(url)
                
            }
        )
        
    }
}