import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import {Auction} from "../models/auction";
import { EntityNotFoundError } from "../models/oth/customErrors";
import ResponseTemplate from "../models/oth/responseTemplate";
import {app} from "../lib/fastify"

import { scheduleUpdateAuctionJob } from "./biddingController";
import * as auctionService from "../services/auctionService";

export async function getAllAuctions(req: FastifyRequest,reply: FastifyReply){
	app.log.info("Get all auctions")
	auctionService.getAllAuctions().then(value => {
		app.log.info(`Auctions retrived with ${value.length} items`)
		reply.code(200).send(new ResponseTemplate(StatusCodes.CREATED,"Auctions found",value))
	}) 
}

export async function getAuctionById(req: FastifyRequest<{Params: {id:string}}>,reply: FastifyReply){
	try {
		app.log.info(`Get auction by id : ${req.params.id}` )
		await auctionService.getAuctionById(req.params.id).then(value => 
			{
				app.log.info(`Auction with id ${value._id} retrived`)
				reply.code(200).send(new ResponseTemplate(StatusCodes.CREATED,"Auction found",[value]))
			})
	} catch (err) {
		throw new EntityNotFoundError(`Auction not found : ${req.params.id}`);
	}
}

export async function addAuction(req: FastifyRequest<{Body: Auction}>,reply: FastifyReply){
	app.log.info(`Add auction ${req.body.auctionName}` )
	await auctionService.addAuction(req.body).then(val => {
		app.log.info(`Auction ${val._id} is added` )
		reply.status(201).send(new ResponseTemplate(StatusCodes.CREATED,"Auction has been added",[val._id]));
		//Once the auction is done , the status of goods will be update automatically
		scheduleUpdateAuctionJob(val._id,val.endTime,val.goods);
	})
}

export async function updateAuctionById(req: FastifyRequest<{Params:{id:string},Body:Auction}>,reply: FastifyReply){
	try{
		app.log.info(`Update auction ${req.params.id}` )
		await auctionService.updateAuctionById(req.params.id,req.body).then(response => {
			app.log.info(`Auction ${req.params.id} is updated` )
			if(req.body.endTime != response.endTime) scheduleUpdateAuctionJob(response._id,response.endTime,response.goods);;
			return new ResponseTemplate(StatusCodes.OK,"Auction has been updated",[req.params.id])
		})	
	} catch(err){
		throw new EntityNotFoundError(`Auction not found : ${req.params.id}`);
	}
}

export async function deleteAuctionById(req: FastifyRequest<{Params:{id:string}}>,reply: FastifyReply){
	app.log.info(`Delete auction ${req.params.id}` )
	await auctionService.deleteAuctionById(req.params.id).then(response => {
		app.log.info(`Auction ${req.params.id} is deleted` )
		return new ResponseTemplate(StatusCodes.MOVED_PERMANENTLY,"Auction has been deleted",[req.params.id])
	})
	
}


