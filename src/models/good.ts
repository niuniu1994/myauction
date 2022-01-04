import { model, Schema } from "mongoose";
import { Currencies } from "./enums/Currency";

// export interface Good{
//     _id: Schema.Types.ObjectId,
//     goodName: string,
//     startingPrice: number,
//     reservePrice: number,
//     finalPrice: number,
//     currency: string,
//     auctions: [string] | null
//     status: string,
//     buyer: string
// }

const goodSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    goodName: { type: String, required: true },
    startingPrice: { type: Number, required: true },
    reservePrice: { type: Number, required: true },
    finalPrice: { type: Number, required: true,default:0},
    currency: { type: String, required: true , default:Currencies.USD},
    auctions: [{ type: Schema.Types.ObjectId, ref: 'auction' }],
    status: {type: String, required: false},
    buyer: {type: Schema.Types.ObjectId , ref: "bidder"}
  });

export default model('good', goodSchema)