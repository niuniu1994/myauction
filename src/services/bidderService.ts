import BidderSchema from "../models/bidder";
export const getBidderById = async (id:string) => await BidderSchema.findById(id);