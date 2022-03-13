import { FastifyRequest, FastifyReply } from "fastify";
import ResponseTemplate from "../models/oth/responseTemplate";
import { StatusCodes } from "http-status-codes";
import { Good } from "../models/good";
import * as goodService from "../services/goodsService";
import { EntityNotFoundError } from "../models/oth/customErrors";
import { app } from "../lib/fastify";

/**
 * Get all goods
 * @param req 
 * @param reply 
 */
export const getAllGoods =  (req: FastifyRequest, reply: FastifyReply) => {
	try{
		app.log.info(`Find all goods`)
		 goodService.findAllGoods().then(value =>  {
			app.log.info(`Goods retrived with ${value.length} items`)
			reply.code(200).send(new ResponseTemplate(StatusCodes.OK,"Good found",value))});
	}catch{
		throw new EntityNotFoundError()
	}
}

/**
 * Get good by id
 * @param req 
 * @param reply 
 */
export const getGoodById =  (req: FastifyRequest<{Params: {id:string}}>, reply: FastifyReply) => {
	try{
		app.log.info(`Get good by id : ${req.params.id}` )
		 goodService.findGoodById(req.params.id).then(value =>  {
			app.log.info(`Good with id ${value._id} retrived`)
			 reply.code(200).send(new ResponseTemplate(StatusCodes.OK,"Good found",[value]))})
	}catch{
		throw new EntityNotFoundError(`Good not found : ${req.params.id}`)
	}	
}
 
/**
 * Add good by id
 * @param req 
 * @param reply 
 * @returns 
 */
export const addGood =  (req: FastifyRequest<{Body:Good}>, reply: FastifyReply) => {
	app.log.info(`Add good ${req.body.goodName}`)
	goodService.addGood(req.body).then(value => {
		app.log.info(`Good ${value._id} is added` )
		reply.code(200).send(new ResponseTemplate(StatusCodes.CREATED,"Good has been added",[value._id]))})
}

/**
 * update good
 * @param req 
 * @param reply 
 */
export const updateGoodById =  (req: FastifyRequest<{Params:{id:string},Body:Good}>, reply: FastifyReply) => {
	try{
		app.log.info(`Update good ${req.params.id}` )
		goodService.updateGoodById(req.params.id,req.body).then(value => {
			app.log.info(`Good ${req.params.id} is updated` )
			reply.code(200).send(new ResponseTemplate(StatusCodes.OK,"Good has been updated",[req.params.id]))})
	}catch{
		throw new EntityNotFoundError()
	}
}

/**
 * Delete good by od
 * @param req 
 * @param reply 
 */
export const deleteGoodById =   (req: FastifyRequest<{Params:{id:string}}>, reply: FastifyReply) =>{
	app.log.info(`Delete good ${req.params.id}` )
	goodService.deleteGoodById(req.params.id).then(() => {
		app.log.info(`Good ${req.params.id} is deleted` )
		reply.code(200).send(new ResponseTemplate(StatusCodes.MOVED_PERMANENTLY,"Good has been deleted",null))}
		)
}





