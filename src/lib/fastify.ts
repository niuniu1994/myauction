import * as fastify from "fastify";
import jwt from 'fastify-jwt';
import cookie from 'fastify-cookie';
import goodRoutes from '../routes/goodRoutes';
import bidderRoutes from "../routes/bidderRoutes";
import auctionRoutes from "../routes/auctionRoutes";
import swagger from 'fastify-swagger';
import {Options} from './swagger'
import config from 'config'
import * as auctionLimitedResponseSchema from '../schemas/auction.limited.response.json';
import * as auctionBasicResponseSchema from '../schemas/auction.basic.response.json';
import * as GoodCompleteResponseSchema from '../schemas/good.complete.response.json';
import * as bidderLimitedResponseSchema from '../schemas/bidder.limited.response.json'
import * as goodLimitedResponseSchema from '../schemas/good.limited.response.json';
export const app = fastify.default({
    logger: true
})
.register(jwt,{
  secret: 'foobar',
  cookie: {
    cookieName: 'token',
    signed: false
  }
})
.register(cookie)
.register(swagger,Options)
.register(auctionRoutes,{prefix:'/v1/auctions'})
.register(goodRoutes,{prefix:"/v1/goods"})
.register(bidderRoutes,{prefix:"v1/bidders"})


//register schema
app.addSchema(auctionBasicResponseSchema)
.addSchema(auctionLimitedResponseSchema)
.addSchema(GoodCompleteResponseSchema)
.addSchema(bidderLimitedResponseSchema)
.addSchema(goodLimitedResponseSchema)

export const startFastify = async (): Promise<void> => {
	try {
		await app.listen(config.get("serverPort"));
		app.swagger();
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
