import { FastifyRequest, FastifyReply } from "fastify";
import ResponseTemplate from "../models/oth/responseTemplate";
import bidderSchema from "../models/bidder";
import auctioneerSchema, { Auctioneer } from "../models/auctioneer";
import { Bidder } from '../models/bidder'
import bcrypt from 'bcrypt';
import { app } from "../lib/fastify";
import { StatusCodes } from "http-status-codes";
import * as authService from "../services/authService";
export const bidderLogin = async (req: FastifyRequest<{ Body: { email: string, password: string } }>, reply: FastifyReply) => {
  try {
    await authService.bidderLogin(req.body.email, req.body.password).then(value => {



      if (value == null) {
        reply.status(404).send({ message: "Username or password incorrect" });
      } else {
        const tokenVal = app.jwt.sign({ role:'bidder',bidderId:value._id,email:value.email }, {
          expiresIn: 86400 // 24 hours
        });
        reply.status(200).send({ token: tokenVal });
      }
    })

  } catch (error) {
    throw error;
  }
};

export const bidderSignup = async (req: FastifyRequest<{ Body: Bidder }>, reply: FastifyReply) => {
  try {
    await authService.bidderSignup(req.body).then(value => {
      if (value) {
        reply.status(400).send(new ResponseTemplate(StatusCodes.CREATED, "Bidder signup successed", null));
      }
      reply.status(400).send(new ResponseTemplate(StatusCodes.BAD_REQUEST, "Bidder email duplicated", null));
    })
  } catch (error) {
    throw error;
  }
}


export const auctioneerSignup = async (req: FastifyRequest<{ Body: Auctioneer }>, reply: FastifyReply) => {
  try {
    await authService.auctioneerSignup(req.body).then(value => {
      if (value) {
        reply.status(400).send(new ResponseTemplate(StatusCodes.CREATED, "Auctioneer signup successed", null));
      }
      reply.status(400).send(new ResponseTemplate(StatusCodes.BAD_REQUEST, "Auctioneer email duplicated", null));
    })
  } catch (error) {
    throw error;
  }
}


export const auctioneerLogin = async (req: FastifyRequest<{ Body: { email: string, password: string } }>, reply: FastifyReply) => {
  try {
    await authService.auctioneerLogin(req.body.email, req.body.password).then(value => {
      if (value == null) {
        reply.status(404).send({ message: "Username or password incorrect" });
      } else {
        const tokenVal = app.jwt.sign({ role:'auctioneer',email: value.email }, {
          expiresIn: 86400 // 24 hours
        });
        reply.status(200).send({ token: tokenVal });
      }
    })
  } catch (error) {
    throw error;
  }
};