import * as fastify from "fastify";
import jwt from 'fastify-jwt';
import cookie from 'fastify-cookie';
import routes from './routes/routes';
import swagger from 'fastify-swagger';
import configs from "../config.json";
import {Options} from './configs/swagger'
export const app = fastify.default({
    logger: true
});
import mongoose from 'mongoose';
import { ConnectionOptions } from "tls";

app.register(jwt,{
    secret: 'foobar',
    cookie: {
      cookieName: 'token',
      signed: false
    }
  });
app.register(cookie);
app.register(swagger,Options);

routes.forEach(route => {
    app.route(route);
});

const start = async (): Promise<void> => {
	try {
		await app.listen(configs.serverPort);
		app.swagger();
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: parseInt(process.env.POOL_SIZE!),
};

mongoose.connect(`mongodb+srv://${configs.db.username}:${configs.db.password}@cluster0.27cbf.mongodb.net/${configs.db.database}?retryWrites=true&w=majority`
,{useNewUrlParser:true, useUnifiedTopology: true} as ConnectionOptions)
		.then(() => console.log('MongoDB connected...'))
		.catch(err => { console.log(err)});    

start();