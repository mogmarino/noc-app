import { CronJob } from 'cron'

// Se recomienda usar interfaces cuando son 3 o mas argumentos
/* interface TipoJob  {
    cronTime: string | Date
    onTick: () => void
} */

type CronTime = string | Date
type OnTick = () => void


export class CronService {

    static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
        const job = new CronJob(
            cronTime, // cronTime
            onTick,
            null, // onComplete
            true, // start
            'America/Los_Angeles' // timeZone
        );

        job.start()

        return job
    }
}