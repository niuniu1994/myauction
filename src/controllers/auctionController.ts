import { FastifyRequest, FastifyReply } from "fastify";
import AuctionModel from "../models/auction";
 
export async function getAuctionById(req: FastifyRequest<{Params: {id:string}}>){
	try {
		// await req.jwtVerify()
		return await AuctionModel.findById(req.params.id).populate('goods');
	} catch (err) {
		throw err;
	}
}


// export const getSingleUser = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {