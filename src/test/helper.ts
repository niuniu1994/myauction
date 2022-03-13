import config from "config";
import mongoose from 'mongoose';
import {app} from '../lib/fastify'
export const dataBaseConnect = () =>  mongoose.connect(`mongodb+srv://${config.get("db.username")}:${config.get("db.password")}@${config.get("db.server")}.mongodb.net/${config.get("db.database")}?retryWrites=true&w=majority`)
export const dataBaseClose = () => mongoose.connection.close()
export const fastify = () => app.ready()