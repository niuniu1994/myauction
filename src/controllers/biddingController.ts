import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { EntityNotFoundError, InvalidPriceError } from "../models/oth/customErrors";
import ResponseTemplate from "../models/oth/responseTemplate";
import GoodSchema, { Good } from "../models/good";
import { scheduleJob } from "node-schedule";
import AuctionSchema, { Auction } from "../models/auction"
import { app } from "../lib/fastify";
import { GoodStatus } from "../models/enums/goodStatus";
import { ObjectId } from "mongodb";


interface Payload {
	role: string,
	bidderId: string,
	email: string
}

/**
 * offer price to a good of an auction
 * @param req 
 * @param reply 
 */
export const offerPrice = async (req: FastifyRequest<{ Params: { auctionId: string, goodId: string, price: number } }>, reply: FastifyReply) => {
	app.log.info("Recevie price for" )
	app.log.info("auctionId : " + req.params.auctionId)
	app.log.info("goodId: " + req.params.goodId)
	app.log.info("price: " + req.params.price)
	await AuctionSchema.findOne({_id:req.params.auctionId,goods:{$in:[req.params.goodId]}}).then(async (auction) => {
		//verify auction exist and is underway
		const now = new Date();
		if (auction  && auction.startTime < now && auction.endTime > now) {
			const token = req.raw.headers.authorization as string;
			const bidder = app.jwt.decode(token, { complete: false }) as Payload;
			await GoodSchema.findOne({ _id: req.params.goodId }).then(async good => {
				if (good.finalPrice < req.params.price && req.params.price > good.startingPrice) {
					good.finalPrice = req.params.price;
					good.buyer = bidder.bidderId
					await GoodSchema.updateOne({ _id: req.params.goodId }, good).then(res => {
						app.log.info(`Offerd price accpeted`)
						reply.code(200).send(new ResponseTemplate(StatusCodes.OK,"Offer accepted",[good._id]))
					})
				} else {
					app.log.info(`Offerd price rejected`)
					throw new InvalidPriceError(`Price is lower than ${good.finalPrice}`)
				}
			});
		} else {
			throw new EntityNotFoundError(`Auction started yet`)
		}
	})

}

/**
 * After un auction ended the status of goods should be updated automatically
 */
export const setupAuctionsUpdateSys = async () => {
	const now = new Date();
	await AuctionSchema.find({ $or: [{ startTime: { $gte: now } }, { endTime: { $gte: now } }] }).then(auctions => {
		auctions.forEach(auction => {
			scheduleUpdateAuctionJob(auction._id, auction.endTime, auction.goods);
		})
	})
}

/**
 * auto update the good's status of an auction after it finished
 * @param auctionId 
 * @param endTime 
 * @param goods 
 */
export const scheduleUpdateAuctionJob = async (auctionId: string | ObjectId, endTime: Date, goods: [Good]) => {

	scheduleJob(endTime, async () => {
		//Verify first the end time of auction has not been modified, if not execute update program
		await AuctionSchema.findOne({ _id: auctionId, endTime: endTime }).then(val => {
			goods.forEach(async good => {
				if (good.finalPrice >= good.reservePrice) {
					good.status = GoodStatus.SOLD;
					app.log.info(`Good={_id:${good._id}} status is updated to ${GoodStatus.SOLD}`)
				} else {
					good.status = GoodStatus.PASS;
					good.buyer = null;
					app.log.info(`Good={_id:${good._id}} status is updated to ${GoodStatus.PASS}`)
				}
				await GoodSchema.updateOne({ _id: good._id }, good);
			})
		})
	})


}


