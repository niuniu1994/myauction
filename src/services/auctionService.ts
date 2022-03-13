import AuctionSchema,{Auction} from "../models/auction";
import BidderSchema from "../models/bidder";
import GoodSchema from "../models/good";
import { Types } from "mongoose";
import { EntityNotFoundError } from "../models/oth/customErrors";

export const getAllAuctions =async () => await AuctionSchema.find().populate('goods').populate('bidders');

export const getAuctionById =async (id:string) => await AuctionSchema.findById(id).populate('goods').populate('bidders')


export const addAuction =async (auction:Auction) => {
    goodsExist(auction.goods);
	biddersExist(auction.bidders);
    return await AuctionSchema.create(auction);
}

export const updateAuctionById = async (id:string,auction:Auction) => {
    goodsExist(auction.goods);
	biddersExist(auction.bidders);
	return await AuctionSchema.findOneAndUpdate({_id: id},auction,{
		new: true
	  })
}

export const deleteAuctionById =async (id:string) => {
	return await AuctionSchema.deleteOne({_id:id})
}



const goodsExist = async (goods: Array<Types.ObjectId>  ) => {
	if(goods != null && goods.length > 0){
		goods.forEach(async goodId => {
			await GoodSchema.findById(goodId).then(val => {
				if(!val) throw new EntityNotFoundError(`Good not found : ${goodId}`);
			})
		})
	}	
}

const biddersExist = async (bidders: Array<Types.ObjectId>) => {
	if(bidders != null && bidders.length > 0){
		bidders.forEach(async bidderId => {
			await BidderSchema.findById(bidderId).then(val => {
				if(!val) throw new EntityNotFoundError(`Bidder not found : ${bidderId}`);
			})
		})
	}
}