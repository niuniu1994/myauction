import { FastifyRequest, FastifyReply } from "fastify";
import ResponseTemplate from "../models/oth/responseTemplate";
import bidderSchema from "../models/bidder";
import auctioneerSchema from "../models/auctioneer";
import {Bidder} from '../models/bidder'
import bcrypt from 'bcrypt';
import {app} from "../lib/fastify";
import { StatusCodes } from "http-status-codes";

export const bidderLogin = async (req: FastifyRequest<{Body:{email:string,password:string}}>, reply: FastifyReply) => {
	try {
        const bidderBody = req.body

        const bidder = await bidderSchema.findOne({
            email: bidderBody.email
        });

        if (!bidder) {
          return reply.status(404).send({ message: "Bidder not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            bidderBody.password,
            bidder.get('password')
          );
    
        if (!passwordIsValid) {
          return reply.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
      
        const token = app.jwt.sign({ role:'bidder',bidderId:bidder._id,email:bidder.email }, {
          expiresIn: 86400 // 24 hours
        });

        reply.status(200).send({ token: token});
	} catch (error) {
    throw error;
  }
};

export const bidderSignup = async (req: FastifyRequest<{Body:Bidder}>, reply: FastifyReply) => {
    try {
        let bidderBody = req.body;

        //email must be unique
        if (await bidderSchema.findOne({ email: bidderBody.email })){
          await reply.status(400).send(new ResponseTemplate(StatusCodes.BAD_REQUEST,"Bidder email duplicated",null));
        }

        const salt = await bcrypt.genSalt();
        bidderBody.password = bcrypt.hashSync(bidderBody.password,salt);
        await bidderSchema.create(bidderBody).then(()=>reply.send(new ResponseTemplate(StatusCodes.CREATED, "Bidder signup successed", null)));
    } catch (error) {
        throw error;
    }
}


export const auctioneerSignup = async (req: FastifyRequest<{Body:Bidder}>, reply: FastifyReply) => {
  try {
      let auctioneerBody = req.body;

      //email must be unique
      if (await auctioneerSchema.findOne({ email: auctioneerBody.email })){
        await reply.status(400).send(new ResponseTemplate(StatusCodes.BAD_REQUEST,"Auctioneer email duplicated",null));
      }
      const salt = await bcrypt.genSalt();
      auctioneerBody.password = bcrypt.hashSync(auctioneerBody.password,salt);
      await auctioneerSchema.create(auctioneerBody).then(()=>reply.send(new ResponseTemplate(StatusCodes.CREATED, "Auctioneer signup successed", null)));
  } catch (error) {
      throw error;
  }
}


export const auctioneerLogin = async (req: FastifyRequest<{Body:{email:string,password:string}}>, reply: FastifyReply) => {
	try {
        const auctioneerBody = req.body

        const auctioneer = await auctioneerSchema.findOne({
            email: auctioneerBody.email
        });

        if (!auctioneerBody) {
          return reply.status(404).send({ message: "Auctioneer not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            auctioneerBody.password,
            auctioneer.password
          );
    
        if (!passwordIsValid) {
          return reply.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
      
        const token = app.jwt.sign({ role:'auctioneer',email:auctioneer.email }, {
          expiresIn: 86400 // 24 hours
        });

        reply.status(200).send({ token: token});
	} catch (error) {
    throw error;
	}
};