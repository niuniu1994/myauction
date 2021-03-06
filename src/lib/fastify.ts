import * as fastify from "fastify";
import * as fs from 'fs';
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
import * as goodCompleteResponseSchema from '../schemas/good.complete.response.json';
import * as bidderCompleteResponseSchema from '../schemas/bidder.complete.response.json'
import * as goodLimitedResponseSchema from '../schemas/good.limited.response.json';
import * as getGoodResponseSchema from '../schemas/good.get.response.json'

import authRoutes from "../routes/authRoute";
import biddingRoutes from "../routes/biddingRoutes";

import { EntityNotFoundError, InvalidInputError, InvalidPriceError, UnauthorizedError } from "../models/oth/customErrors";
export const app = fastify.default({
    logger: true
})
.register(jwt,{
  secret: {
    private: fs.readFileSync('config/private.key'),
    public: fs.readFileSync('config/public.key'),
  },
  sign: { algorithm: 'RS256' }
})
.register(cookie)
.register(swagger,Options)
.register(auctionRoutes,{prefix:'/v1/auctions'})
.register(goodRoutes,{prefix:"/v1/goods"})
.register(bidderRoutes,{prefix:"v1/bidders"})
.register(authRoutes,{prefix:'/v1/auth'})
.register(biddingRoutes,{prefix:'/v1/bidding'})
//register schema
.addSchema(auctionBasicResponseSchema)
.addSchema(auctionLimitedResponseSchema)
.addSchema(goodCompleteResponseSchema)
.addSchema(bidderCompleteResponseSchema)
.addSchema(goodLimitedResponseSchema)
.addSchema(getGoodResponseSchema)
.setErrorHandler((error, request, reply) => {
    // based on https://github.com/fastify/fastify/blob/1e94070992d911a81a26597c25f2d35ae65f3d91/fastify.js#L74
    if (error instanceof UnauthorizedError) {
      void reply.status(422).send(error)
    } else if (error instanceof EntityNotFoundError) {
      reply.log.info({ res: reply, err: error }, error?.message)
      void reply.status(404).send(new Error('Requested entity not found'))
    } else if (error instanceof InvalidPriceError){
      reply.log.info({ res: reply, err: error }, error?.message)
      void reply.status(404).send(new Error('Price is lower than or equal to actual price'))
    } else if (error instanceof InvalidInputError){
      reply.log.info({ res: reply, err: error }, error?.message)
      void reply.status(404).send(new Error('Input contains invalid data'))
    }else if (reply.statusCode < 500) {
      reply.log.info({ res: reply, err: error }, error?.message)
      void reply.send(error)
    } else {
      reply.log.error({ req: request, res: reply, err: error }, error?.message)
      void reply.send(new Error('Internal Server Error, message dropped'))
    }
  })



export const startFastify = async (): Promise<void> => {
	try {
		await app.listen(config.get("serverPort"));
		app.swagger();
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
