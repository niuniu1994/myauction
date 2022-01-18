import { FastifyInstance } from "fastify";
import * as biddingControler from "../controllers/biddingController"
import addUpdateDeleteGoodResponseSchema from '../schemas/add.update.delete.response.json'
import * as auths from "../services/auths";

export default async function goodRoutes(fastify:FastifyInstance) {

    fastify.post("/auction/:auctionId/good/:goodId/:price",{
        schema:{
            description: "Offer price for a good",
            tags: ['good'],
            summary: 'Offer price for a good',
            params: {
				type: 'object',
				properties: {
					auctionId: {
						type: 'string',
						description: 'id of auction'
					},
                    goodId:{
                        type: 'string',
                        description: 'id of good'
                    },
                    price:{
                        type: 'number',
                        description: 'price offering'
                    }
				}
			},
            response: {
                 200: addUpdateDeleteGoodResponseSchema
            }
          },
          preHandler:[auths.bidderAuthPolicy],
          handler: biddingControler.offerPrice
    })
    

}