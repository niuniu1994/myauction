import { FastifyRequest, FastifyReply } from "fastify";
import BidderSchema from "../models/bidder";

 
export const getBidderById = async (req: FastifyRequest<{
	Params: {id:string}
  }>, reply: FastifyReply)=> {
	try {
		// await req.jwtVerify()
		return await BidderSchema.findById(req.params.id).populate({path:'auctions'});
	} catch (err) {
		throw err;
	}
};
