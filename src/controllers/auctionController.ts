import { FastifyRequest, FastifyReply } from "fastify";
import AuctionModel from "../models/auction";
import { app } from "..";
 
export const getAuctionById = async (req: FastifyRequest, reply: FastifyReply)=> {
	try {
		// await req.jwtVerify()
        const params: any = req.params;
		return await AuctionModel.findById(params.auctionId);
	} catch (err) {
        app.log.error(err);
		throw err;
	}
};

// export const getSingleUser = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {