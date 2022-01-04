import { FastifyRequest, FastifyReply } from "fastify";
import GoodModel from "../models/good";
import { app } from "..";
import good from "../models/good";
 
export const getGoodById = async (req: FastifyRequest, reply: FastifyReply)=> {
	try {
		// await req.jwtVerify()
        const params: any = req.params;
		return await GoodModel.findById(params.goodId);
	} catch (err) {
        app.log.error(err);
		throw err;
	}
};

// export const getSingleUser = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {