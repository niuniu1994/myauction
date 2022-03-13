import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import ResponseTemplate from "../models/oth/responseTemplate";
import * as bidderService from "../services/bidderService"
import { app } from "../lib/fastify";

export const getBidderById = async (req: FastifyRequest<{
	Params: {id:string}
  }>, reply: FastifyReply)=> {
	try {
		app.log.info(`Get bidder ${req.params.id}` )        
		bidderService.getBidderById(req.params.id).then(value => {
			app.log.info(`Bidder ${req.params.id} retrived`)        
			reply.code(200).send(new ResponseTemplate(StatusCodes.OK,"Bidder found",[value]))})
	} catch (err) {
		throw err;
	}
};
