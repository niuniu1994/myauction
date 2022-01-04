import { FastifyRequest, FastifyReply } from "fastify";
import BidderModel from "../models/bidder";
import { app } from "..";
import good from "../models/good";
 
export const getBidderById = async (req: FastifyRequest, reply: FastifyReply)=> {
	try {
		// await req.jwtVerify()
        const params: any = req.params;
		return await BidderModel.findById(params.bidderId).populate({path:'auctions'});
	} catch (err) {
        app.log.error(err);
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