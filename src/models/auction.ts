
import { model, Schema, Types } from "mongoose"


export interface Auction {
    _id: Types.ObjectId,
    auctionName: string,
    theme: string,
    startTime: Schema.Types.Date,
    endTime: Schema.Types.Date,
    goods: Types.Array<Types.ObjectId>,
    bidders: Types.Array<Types.ObjectId>
}

const auctionSchema = new Schema({
    auctionName: { type: String, required: true },
    theme: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    goods:  [{ type: Schema.Types.ObjectId, ref: 'good' ,default:[]}],
    bidders: [{ type: Schema.Types.ObjectId, ref: 'bidder' ,default:[] }],
  },{versionKey:false});
                      
export default model('auction', auctionSchema)