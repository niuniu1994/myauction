import bidderSchema, { Bidder } from "../models/bidder";
import auctioneerSchema, { Auctioneer } from "../models/auctioneer";
import {app} from "../lib/fastify";
import bcrypt from 'bcrypt';

export const bidderLogin = async (email:string,password:string)=>{
    const bidder = await bidderSchema.findOne({
        email: email
    })
    if(!bidder) return null;
    if(!verifyPassword(password,bidder.password)) return null;   
    return bidder;

}

export const bidderSignup = async (bidder:Bidder):Promise<Boolean> => {
    //email must be unique
    const value = await bidderSchema.findOne({ email: bidder.email})
    if(value) return false;
    const salt = await bcrypt.genSalt();
    bidder.password = bcrypt.hashSync(bidder.password,salt);
    await bidderSchema.create(bidder)
    return true;
}


export const auctioneerSignup =async (auctioneer:Auctioneer) => {
    const value = await auctioneerSchema.findOne({ email: auctioneer.email})
    if(value) return false;
    const salt = await bcrypt.genSalt();
    auctioneer.password = bcrypt.hashSync(auctioneer.password,salt);
    await auctioneerSchema.create(auctioneer);
    return true;
}

export const auctioneerLogin =async (email:string,password:string) => {
    const auctioneer = await auctioneerSchema.findOne({
        email: email
    });
    if(!auctioneer) return null;
    if(!verifyPassword(password,auctioneer.password)) return null;   
    return auctioneer;

}

/**
 * if password1 equals password2 then return true otherwise retrun false
 * @param password1 
 * @param password2 
 * @returns 
 */
const verifyPassword = (uncodedPassword:string,encodedPassword:string)=>{
    const res = bcrypt.compareSync(
        uncodedPassword,
        encodedPassword
       );
      
    return res;
}