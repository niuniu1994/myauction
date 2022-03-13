import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { app } from "../lib/fastify";
import { UnauthorizedError } from "../models/oth/customErrors";


//Autentification for auctionner
export const auctioneerAuthPolicy = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    const token = request.raw.headers.authorization as string;

    if(!token){
        done(new UnauthorizedError('Missing token header')) 
    }

    app.jwt.verify(token, (error,decoded) => {
        console.log(decoded)
        if (error || !decoded.role ||  decoded.role !== 'auctioneer'){
            done(new UnauthorizedError("Token not valid"))
        }else{
            done()
        }
    });
}


//Autentification for bidder
export const bidderAuthPolicy = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    const token = request.raw.headers.authorization as string;

    if(!token){
        done(new UnauthorizedError('Missing token header')) 
    }

    app.jwt.verify(token, (error,decoded) => {

        if (error || !decoded.role ||  decoded.role !== 'bidder'){
            done(new UnauthorizedError('Token not valid'))
        }else{
            done()
        }
    });
}