import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase, LogModel } from "./data/mongo";
import { PrismaClient } from "../generated/prisma";


(async () => {
    main();
})()

async function main() {

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })

    // const prisma = new PrismaClient()
   /*  const newLog = await prisma.logModel.create({
        data:{
            message: 'Nazario Ronaldo not Cristiano',
            level: 'MEDIUM',
            origin: 'App.ts'
        }
    }) */

    // const logs = await prisma.logModel.findMany()

    // console.log(logs);
    

    // crear un documento en una colleccion
    /* const newLog = await LogModel.create({
        message: 'Test  orlando magic',
        origin: 'App.ts',
        level: 'high'
    })

    await newLog.save()

    console.log(newLog); */

   /*  const logs = await LogModel.find({level: 'high'})

    console.log(logs); */
    
    

    Server.start();
    // console.log(envs);
    
}