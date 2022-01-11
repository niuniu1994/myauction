import { FastifyInstance, RouteOptions } from "fastify";
import * as authController from '../controllers/authController'
import bidderLimitedResponse from '../schemas/bidder.limited.response.json'
import auctioneerBasicRequestSchema from '../schemas/auctioneer.basic.request.json'
import loginRequestSchema from '../schemas/login.request.json'
export default async function authRoutes(fastify: FastifyInstance) {

  fastify.post('/bidder/signup',{
    schema: {
        body:bidderLimitedResponse
    },
    handler: authController.bidderSignup
  }
  )

  fastify.post('/bidder/login',{
    schema: {
        body:loginRequestSchema,
    },
    handler: authController.bidderLogin
  }
  )

  fastify.post('/auctioneer/login',{
    schema: {
      body:loginRequestSchema,
    },
    handler: authController.auctioneerLogin
  }
  )

  fastify.post('/auctioneer/signup',{
    schema: {
      body:auctioneerBasicRequestSchema,
    },
    handler: authController.auctioneerSignup
  }
  )
}
