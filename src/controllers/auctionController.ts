import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import GoodSchema from "../models/good";
import AuctionSchema,{Auction} from "../models/auction";
import { EntityNotFoundError } from "../models/oth/customErrors";
import ResponseTemplate from "../models/oth/responseTemplate";
import BidderSchema from "../models/bidder";
import { scheduleUpdateAuctionJob } from "./biddingController";
import { ObjectId } from "mongodb";

export async function getAllAuctions(req: FastifyRequest,reply: FastifyReply){
	const auctions = await AuctionSchema.find().populate('goods').populate('bidders');
	console.log(auctions)
	return new ResponseTemplate(StatusCodes.CREATED,"Auctions found",auctions)
}

export async function getAuctionById(req: FastifyRequest<{Params: {id:string}}>,reply: FastifyReply){
	try {
		const auction = await AuctionSchema.findById(req.params.id).populate('goods').populate('bidders');
		console.log(auction)
		return new ResponseTemplate(StatusCodes.CREATED,"Auction found",[auction])
	} catch (err) {
		throw new EntityNotFoundError(`Auction not found : ${req.params.id}`);
	}
}

export async function addAuction(req: FastifyRequest<{Body: Auction}>,reply: FastifyReply){
	const auction = req.body;
	goodsExist(auction.goods);
	biddersExist(auction.bidders);
	await AuctionSchema.create(auction).then(val => {
		reply.status(201).send(new ResponseTemplate(StatusCodes.CREATED,"Auction has been added",[val._id]));
		//Once the auction is done , the status of goods will be update automatically
		scheduleUpdateAuctionJob(val._id,val.endTime,val.goods);
	})
}

export async function updateAuctionById(req: FastifyRequest<{Params:{id:string},Body:Auction}>,reply: FastifyReply){
	try{
		const auction = req.body;
		goodsExist(auction.goods);
		biddersExist(auction.bidders);
	
		await AuctionSchema.findOneAndUpdate({_id:req.params.id},auction).then(newAuction => {
			if(auction.endTime != newAuction.endTime) scheduleUpdateAuctionJob(newAuction._id,newAuction.endTime,newAuction.goods);;
			return new ResponseTemplate(StatusCodes.OK,"Auction has been updated",[req.params.id])
			})
		
		
	} catch(err){
		throw new EntityNotFoundError(`Auction not found : ${req.params.id}`);
	}
}

export async function deleteAuctionById(req: FastifyRequest<{Params:{id:string}}>,reply: FastifyReply){
	await AuctionSchema.deleteOne({_id:req.params.id})
	return new ResponseTemplate(StatusCodes.MOVED_PERMANENTLY,"Auction has been deleted",[req.params.id])
}


const goodsExist = async (goods: Types.Array<Types.ObjectId>) => {
	if(goods != null && goods.length > 0){
		goods.forEach(async goodId => {
			await GoodSchema.findById(goodId).then(val => {
				if(!val) throw new EntityNotFoundError(`Good not found : ${goodId}`);
			})
		})
	}	
}

const biddersExist = async (bidders: Types.Array<Types.ObjectId>) => {
	if(bidders != null && bidders.length > 0){
		bidders.forEach(async bidderId => {
			await BidderSchema.findById(bidderId).then(val => {
				if(!val) throw new EntityNotFoundError(`Bidder not found : ${bidderId}`);
			})
		})
	}
}