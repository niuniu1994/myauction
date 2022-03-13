import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import AuctionSchema,{Auction} from "../models/auction";
import { EntityNotFoundError } from "../models/oth/customErrors";
import ResponseTemplate from "../models/oth/responseTemplate";

import { scheduleUpdateAuctionJob } from "./biddingController";
import * as auctionService from "../services/auctionService";

export async function getAllAuctions(req: FastifyRequest,reply: FastifyReply){
	auctionService.getAllAuctions().then(value => reply.code(200).send(new ResponseTemplate(StatusCodes.CREATED,"Auctions found",value))) 
}

export async function getAuctionById(req: FastifyRequest<{Params: {id:string}}>,reply: FastifyReply){
	try {
		await auctionService.getAuctionById(req.params.id).then(value => reply.code(200).send(new ResponseTemplate(StatusCodes.CREATED,"Auction found",[value])))
	} catch (err) {
		throw new EntityNotFoundError(`Auction not found : ${req.params.id}`);
	}
}

export async function addAuction(req: FastifyRequest<{Body: Auction}>,reply: FastifyReply){
	await auctionService.addAuction(req.body).then(val => {
		reply.status(201).send(new ResponseTemplate(StatusCodes.CREATED,"Auction has been added",[val._id]));
		//Once the auction is done , the status of goods will be update automatically
		scheduleUpdateAuctionJob(val._id,val.endTime,val.goods);
	})
}

export async function updateAuctionById(req: FastifyRequest<{Params:{id:string},Body:Auction}>,reply: FastifyReply){
	try{
		await auctionService.updateAuctionById(req.params.id,req.body).then(response => {
			if(req.body.endTime != response.endTime) scheduleUpdateAuctionJob(response._id,response.endTime,response.goods);;
			return new ResponseTemplate(StatusCodes.OK,"Auction has been updated",[req.params.id])
		})	
	} catch(err){
		throw new EntityNotFoundError(`Auction not found : ${req.params.id}`);
	}
}

export async function deleteAuctionById(req: FastifyRequest<{Params:{id:string}}>,reply: FastifyReply){
	await auctionService.deleteAuctionById(req.params.id).then(response => {
		return new ResponseTemplate(StatusCodes.MOVED_PERMANENTLY,"Auction has been deleted",[req.params.id])
	})
	
}
