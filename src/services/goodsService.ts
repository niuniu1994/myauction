import { ObjectId } from "mongoose";
import GoodSchema, { Good } from "../models/good";
import BidderSchema from "../models/bidder"
import { InvalidInputError } from "../models/oth/customErrors";

export const findAllGoods = async () => await GoodSchema.find();

export const findGoodById = async (id:string) => await GoodSchema.findById(id);

export const addGood = async (good:Good) =>{
    if(good.buyer) bidderExiste(good.buyer)
    return await GoodSchema.create(good)} 

export const updateGoodById = async (id:string,good:Good) => await GoodSchema.updateOne({_id:id},good,{new:true})

export const deleteGoodById =async (id:string) => await GoodSchema.deleteOne({_id:id})

const bidderExiste = async (bidderId :string | ObjectId ) =>{
	const buyer = BidderSchema.findById(bidderId);
	if(!buyer){
		throw new InvalidInputError(`Bidder not found : ${bidderId} `);
	}
}