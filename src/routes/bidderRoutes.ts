import { FastifyInstance, RouteOptions } from "fastify";
import * as bidderController from '../controllers/bidderController'
import BidderCompeleteSchema from '../schemas/bidder.complete.response.json'

export default async function bidderRoutes(fastify: FastifyInstance) {

	fastify.get("/:id", {
		schema: {
			description: 'Gets a single bidder',
			tags: ['bidder'],
			summary: 'Gets bidder by Id',
			params: {
				type: 'object',
				properties: {
					id: {
						type: 'string',
						description: 'bidder Id'
					}
				}
			},
			response: {
				200: BidderCompeleteSchema
			}
		},
		handler: bidderController.getBidderById
	}

	)


}

