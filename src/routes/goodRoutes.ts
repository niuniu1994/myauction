import { FastifyInstance, RouteOptions } from "fastify";
import * as goodController from '../controllers/goodController'
import getGoodResponseSchema from '../schemas/good.get.response.json'
import addUpdateDeleteGoodResponseSchema from '../schemas/add.update.delete.response.json'
import GoodRequestSchema from '../schemas/good.request.json'
import * as auths from "../services/auths";
export default async function goodRoutes(fastify:FastifyInstance) {

  fastify.get("/",{
	schema:{
		description: 'Gets all goods',
		tags: ['good'],
		summary: 'Gets all goods',
		response: {
			 200: getGoodResponseSchema
		}
	  },
	  handler: goodController.getAllGoods
	})

  fastify.get("/:id",{
    schema:{
      description: 'Gets a single good by id',
			tags: ['good'],
			summary: 'Gets good by Id',
			params: {
				type: 'object',
				properties: {
					id: {
						type: 'string',
						description: 'id of good'
					}
				}
			}
			,
			response: {
				200: getGoodResponseSchema
			}
    },
    handler: goodController.getGoodById
  })
  
  fastify.post("/",{
	  schema:{
		description: 'Add single good',
		tags: ['good'],
		body: GoodRequestSchema,
		response: {
			200: addUpdateDeleteGoodResponseSchema
		}
	  },
	  preHandler: [
		  auths.auctioneerAuthPolicy
	  ],
	  handler: goodController.addGood
  })

   
  fastify.patch("/:id",{
	schema:{
		description: 'Update good by id',
		tags: ['good'],
		body: GoodRequestSchema,
		response: {
			200: addUpdateDeleteGoodResponseSchema
		}
	},
	preHandler: [
		auths.auctioneerAuthPolicy
	],
	handler: goodController.updateGoodById
  })

  fastify.delete("/:id",{
	  schema:{
		description: 'Delete good by id',
		tags: ['good'],
		response: {
			200: addUpdateDeleteGoodResponseSchema
		}
	  },
	  preHandler:[
		  auths.auctioneerAuthPolicy
	  ],
	  handler: goodController.deleteGoodById

  })

}





// const bidderSignupRoute: RouteOptions = {
//   method: 'POST',
//   url: '/api/auth/bidder/signup',
//   handler: authController.signup,
//   // schema: SignupSchema
// }

// const bidderLoginRoute: RouteOptions = {
//   method: 'POST',
//   url: '/api/auth/bidder/login',
//   handler: authController.login,
//   // schema: LoginSchema
// }
// const getUserRoute: RouteOptions = {
//   method: 'GET',
//   url: '/api/users/:id',
//   handler: usersController.getSingleUser
// };

// const postUserRoute: RouteOptions = {
//   method: 'POST',
//   url: '/api/users',
//   handler: usersController.addUser,
//   schema: AddUserSchema
// };

// const signupRoute: RouteOptions = {
//   method: 'POST',
//   url: '/api/auth/signup',
//   handler: authController.signup,
//   schema: SignupSchema
// }

// const loginRoute: RouteOptions = {
//   method: 'POST',
//   url: '/api/auth/login',
//   handler: authController.login,
//   schema: LoginSchema
// }
