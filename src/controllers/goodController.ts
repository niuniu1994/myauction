import { FastifyRequest, FastifyReply } from "fastify";
import GoodSchema, { Good } from "../models/good";
import BidderSchema from "../models/bidder"
import ResponseTemplate from "../models/oth/responseTemplate";
import { StatusCodes } from "http-status-codes";
import { EntityNotFoundError, InvalidInputError } from "../models/oth/customErrors";
import { ObjectId } from "mongodb";

export const getAllGoods = async (req: FastifyRequest, reply: FastifyReply) => {
	try{
		const good = await GoodSchema.find();
		reply.status(200).send(new ResponseTemplate(StatusCodes.CREATED,"Good found",good))
	}catch{
		throw new EntityNotFoundError()
	}
}

export const getGoodById = async (req: FastifyRequest<{Params: {id:string}}>, reply: FastifyReply) => {
	try{
		const good = await GoodSchema.findById(req.params.id);
		console.log(good)
		reply.status(200).send(new ResponseTemplate(StatusCodes.CREATED,"Good found",[good]))
	}catch{
		throw new EntityNotFoundError(`Good not found : ${req.params.id}`)
	}	
}
 
export const addGood = async (req: FastifyRequest<{Body:Good}>, reply: FastifyReply) => {
	const good = req.body
	if(good.buyer) bidderExiste(good.buyer);
	await GoodSchema.create(good)
	.then((val => reply.status(201)
	.send(new ResponseTemplate(StatusCodes.CREATED,"Good has been added",[val._id]))))
	

	// const session = await mongoose.startSession()
	// session.startTransaction();
	// try {
	// 	//verify buyer
	// 	if(good.buyer) bidderExiste(good.buyer);
	// 	reply.status(201).send(new ResponseTemplate(StatusCodes.CREATED,"Good has been added",null))
	// 	await session.commitTransaction();
	// } catch (error) {
	// 	await session.abortTransaction();
	// 	throw error;
	// } finally {
	// 	session.endSession();
	// }

}

export const updateGoodById = async (req: FastifyRequest<{Params:{id:string},Body:Good}>, reply: FastifyReply) => {
	try{
		await GoodSchema.updateOne({_id:req.params.id},req.body)
		reply.status(200).send(new ResponseTemplate(StatusCodes.OK,"Good has been updated",[req.params.id]))
	}catch{
		throw new EntityNotFoundError()
	}
}

export const deleteGoodById = async  (req: FastifyRequest<{Params:{id:string}}>, reply: FastifyReply) =>{
	await GoodSchema.deleteOne({_id:req.params.id})
	reply.status(200).send(new ResponseTemplate(StatusCodes.MOVED_PERMANENTLY,"Good has been deleted",null))
}



const bidderExiste = async (bidderId :string | ObjectId ) =>{
	const buyer = BidderSchema.findById(bidderId);
	if(!buyer){
		throw new InvalidInputError(`Bidder not found : ${bidderId} `);
	}
}


