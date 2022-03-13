import mongoose from 'mongoose';
import { ConnectionOptions } from "tls";
import config from 'config'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: parseInt(process.env.POOL_SIZE!),
};


export async function mongodbConnect() {
    return await mongoose.connect(`mongodb+srv://${config.get("db.username")}:${config.get("db.password")}@${config.get("db.server")}.mongodb.net/${config.get("db.database")}?retryWrites=true&w=majority`
    ,{useNewUrlParser:true, useUnifiedTopology: true} as ConnectionOptions)
            .then(() => console.log('MongoDB connected...'))
            .catch(err => { console.log(err)});    
} 