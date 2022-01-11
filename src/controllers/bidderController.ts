import { FastifyRequest, FastifyReply } from "fastify";
import BidderModel from "../models/bidder";
import { app } from "../lib/fastify";

 
export const getBidderById = async (req: FastifyRequest<{
	Params: {id:string}
  }>, reply: FastifyReply)=> {
	try {
		// await req.jwtVerify()
		return await BidderModel.findById(req.params.id).populate({path:'auctions'});
	} catch (err) {
		throw err;
	}
};

// export const getSingleUser = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
//     try {
//         const id = req.params.id;
//         const user = await User.findById(id);
//         return user;
//     } catch (error) {
//         app.log.error(err);
//         throw err;
//     }
// }

// export const addUser = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
// 	try {
// 		let body = JSON.parse(req.body);
// 		console.log(body);
// 		const car = new User(body);
// 		return await car.save();
// 	} catch (err) {
//         app.log.error(err);
// 		throw err;
// 	}
// };