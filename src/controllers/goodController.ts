import { FastifyRequest, FastifyReply } from "fastify";
import GoodModel from "../models/good";
import { app } from "../lib/fastify";
 
export const getGoodById = async (req: FastifyRequest<{Params: {id:string}}>)=> {
	try {
		// await req.jwtVerify()
		const x = await GoodModel.findById(req.params.id).populate("auctions");
		console.log(x);
		return x;
	} catch (err) {
        app.log.error(err);
		throw err;
	}
};

// export const getSingleUser = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {