import { FastifyInstance, RouteOptions } from "fastify";
import * as auctionController from '../controllers/auctionController'
import auctionLimitedResponseSchema from '../schemas/auction.limited.response.json'

export default async function auctionRoutes(fastify: FastifyInstance) {

  fastify.get('/:id',{
    schema: {
      response : {
        200 : auctionLimitedResponseSchema
      }
    },
    handler: auctionController.getAuctionById
  }
  )

}
