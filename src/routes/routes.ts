import { RouteOptions } from "fastify";
import * as bidderController from '../controllers/bidderController';
import * as goodController from '../controllers/goodController'
import * as auctionController from '../controllers/auctionController'
import * as authController from '../controllers/authController'
import {AddBidderSchema,GetBidderSchema} from './schemas/bidderSchema'
const getBidderRoute: RouteOptions = {
  method: 'GET',
  url: '/api/users/:bidderId',
  handler: bidderController.getBidderById,
  schema: GetBidderSchema
};

const getAucationRoute: RouteOptions = {
  method: 'GET',
  url: '/api/auctions/:auctionId',
  handler: auctionController.getAuctionById
};


const getGoodRoute: RouteOptions = {
  method: 'GET',
  url: '/api/goods/:goodId',
  handler: goodController.getGoodById
};



// const bidderSignupRoute: RouteOptions = {
//   method: 'POST',
//   url: '/api/auth/bidder/signup',
//   handler: authController.signup,
//   // schema: SignupSchema
// }

const bidderLoginRoute: RouteOptions = {
  method: 'POST',
  url: '/api/auth/bidder/login',
  handler: authController.login,
  // schema: LoginSchema
}
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

const routes = [getBidderRoute,getGoodRoute,getAucationRoute];

export default routes;