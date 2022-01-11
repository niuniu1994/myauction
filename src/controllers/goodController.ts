import { FastifyRequest, FastifyReply } from "fastify";
import GoodModel, { Good } from "../models/good";
import BidderModel from "../models/bidder"
import ResponseTemplate from "../models/oth/responseTemplate";
import { StatusCodes } from "http-status-codes";
import AuctionModel from "../models/auction";
import { EntityNotFoundError, InvalidInputError } from "../models/oth/customErrors";
import mongoose from 'mongoose'
import { ObjectId } from "mongodb";
import bidder from "../models/bidder";
 
export const getGoodById = async (req: FastifyRequest<{Params: {id:string}}>, reply: FastifyReply) => {
	try{
		const good = await GoodModel.findById(req.params.id).populate("auctions");
		reply.status(200).send(new ResponseTemplate(StatusCodes.CREATED,"Good found",good))
	}catch{
		throw new EntityNotFoundError()
	}
	
}
 
export const addGood = async (req: FastifyRequest<{Body:Good}>, reply: FastifyReply) => {
	const good = req.body
	const session = await mongoose.startSession()
	session.startTransaction();

	try {

		//verify auctionId of the good is valid
		good.auctions.forEach(async auctionId => {
			auctionExiste(auctionId)
		});

		//verify buyer
		if(good.buyer){
			bidderExiste(good.buyer)
		}
	
		await GoodModel.create(req.body).then(async val => {
			//update auctions
			good.auctions.forEach(async auctionId => {
				const auction = await AuctionModel.findById(auctionId);
				auction.goods.push(val._id);
				await AuctionModel.updateOne({_id:auctionId},auction);
			})

			//update bidder
			if(good.buyer){
				const bidder = await BidderModel.findById(good.buyer);
				bidder.goods.push(val._id);
				BidderModel.updateOne({_id:good.buyer},bidder);
			}
			

		});

		reply.status(201).send(new ResponseTemplate(StatusCodes.CREATED,"Good has been added",null))
		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}


}

export const updateGoodById = async (req: FastifyRequest<{Params:{id:string},Body:Good}>, reply: FastifyReply) => {
	await GoodModel.updateOne({_id:req.params.id},req.body)
	reply.status(200).send(new ResponseTemplate(StatusCodes.CREATED,"Good has been updated",null))
}

export const deleteGoodById = async  (req: FastifyRequest<{Params:{id:string}}>, reply: FastifyReply) =>{
	await GoodModel.deleteOne({_id:req.params.id})
	reply.status(200).send(new ResponseTemplate(StatusCodes.MOVED_PERMANENTLY,"Good has been deleted",null))
}

const auctionExiste = async (auctionId: string | ObjectId) => {
	const auction = await AuctionModel.findById(auctionId);
	if (!auction){
		throw new InvalidInputError("Auction not found");
	}
}

const bidderExiste = async (bidderId :string | ObjectId) =>{
	const buyer = BidderModel.findById(bidderId);
			if(!buyer){
				throw new InvalidInputError("Bidder not found");
			}
}