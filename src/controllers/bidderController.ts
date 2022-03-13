import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import ResponseTemplate from "../models/oth/responseTemplate";
import * as bidderService from "../services/bidderService"
 
export const getBidderById = async (req: FastifyRequest<{
	Params: {id:string}
  }>, reply: FastifyReply)=> {
	try {
		 bidderService.getBidderById(req.params.id).then(value => reply.code(200).send(new ResponseTemplate(StatusCodes.OK,"Bidder found",[value])))
	} catch (err) {
		throw err;
	}
};
