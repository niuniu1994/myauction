import { FastifyInstance, RouteOptions } from "fastify";
import * as goodController from '../controllers/goodController'
import GoodCompleteResponseSchema from '../schemas/good.complete.response.json'

export default async function goodRoutes(fastify:FastifyInstance) {

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
				200: GoodCompleteResponseSchema
			}
    },
    handler: goodController.getGoodById
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
