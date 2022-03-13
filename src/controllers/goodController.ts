import { FastifyRequest, FastifyReply } from "fastify";
import ResponseTemplate from "../models/oth/responseTemplate";
import { StatusCodes } from "http-status-codes";
import { Good } from "../models/good";
import * as goodService from "../services/goodsService";
import { EntityNotFoundError } from "../models/oth/customErrors";

/**
 * Get all goods
 * @param req 
 * @param reply 
 */
export const getAllGoods =  (req: FastifyRequest, reply: FastifyReply) => {
	try{
		 goodService.findAllGoods().then(value =>  reply.code(200).send(new ResponseTemplate(StatusCodes.OK,"Good found",value)));
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
		 goodService.findGoodById(req.params.id).then(value =>  reply.code(200).send(new ResponseTemplate(StatusCodes.OK,"Good found",[value])))
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
	goodService.addGood(req.body).then(value => reply.code(200).send(new ResponseTemplate(StatusCodes.CREATED,"Good has been added",[value._id])))
}

/**
 * update good
 * @param req 
 * @param reply 
 */
export const updateGoodById =  (req: FastifyRequest<{Params:{id:string},Body:Good}>, reply: FastifyReply) => {
	try{
		goodService.updateGoodById(req.params.id,req.body).then(value => reply.code(200).send(new ResponseTemplate(StatusCodes.OK,"Good has been updated",[req.params.id])))
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
	goodService.deleteGoodById(req.params.id).then(() => reply.code(200).send(new ResponseTemplate(StatusCodes.MOVED_PERMANENTLY,"Good has been deleted",null)))
}





