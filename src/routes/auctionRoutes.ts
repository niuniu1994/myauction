import { FastifyInstance, RouteOptions } from "fastify";
import * as auctionController from '../controllers/auctionController'
import auctionGetResponseSchema from '../schemas/auction.get.response.json'
import * as auths from "../services/auths";
import addUpdateDeleteGoodResponseSchema from '../schemas/add.update.delete.response.json'
import auctionRequestSchema from '../schemas/auction.request.json'

export default async function auctionRoutes(fastify: FastifyInstance) {

  fastify.get('/:id',{
    schema: {
      description: 'Get auction by id',
			tags: ['auction'],
			summary: 'Get auction by id',
      params :  {
        type: 'object',
				properties: {
					id: {
						type: 'string',
						description: 'id of auction'
					}
				}
      },
      response : {
        200 : auctionGetResponseSchema
      }
    },
    handler: auctionController.getAuctionById
  })

  fastify.get('/',{
    schema: {
      description: 'Get all auctions',
			tags: ['auction'],
			summary: 'Get all auctions',
      response : {
        200 : auctionGetResponseSchema
      }
    },
    handler: auctionController.getAllAuctions
  })

  fastify.post('/',{
    schema: {
      description: 'Add new auction',
			tags: ['auction'],
			summary: 'Add new auction',
      body: auctionRequestSchema,
      response : {
        200 : addUpdateDeleteGoodResponseSchema
      }
    },
    preHandler: [
		  auths.auctioneerAuthPolicy
	  ],
    handler: auctionController.addAuction
  })

  fastify.patch('/:id',{
    schema: {
      description: 'Update auction by id',
			tags: ['auction'],
			summary: 'Update auction by id',
      params :  {
        type: 'object',
				properties: {
					id: {
						type: 'string',
						description: 'id of auction'
					}
				}
      },
      body: auctionRequestSchema,
      response : {
        200 : addUpdateDeleteGoodResponseSchema
      }
    },
    preHandler: [
		  auths.auctioneerAuthPolicy
	  ],
    handler: auctionController.updateAuctionById
  })

  fastify.delete("/:id",{
    schema: {
      description: 'Delete auction by id',
			tags: ['auction'],
			summary: 'Delete auction by id',
      params :  {
        type: 'object',
				properties: {
					id: {
						type: 'string',
						description: 'id of auction'
					}
				}
      },
      response : {
        200 : addUpdateDeleteGoodResponseSchema
      }
    },
    handler: auctionController.deleteAuctionById
  })
}
