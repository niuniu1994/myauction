import { model, Schema } from "mongoose";
import { Currency } from "./enums/Currency";

export interface Good{
    _id?: Schema.Types.ObjectId | null,
    goodName: string,
    startingPrice: number,
    reservePrice: number,
    finalPrice: number,
    currency: string,
    status: string,
    buyer: string | null
}

const goodSchema = new Schema({
    goodName: { type: String, required: true },
    startingPrice: { type: Number, required: true },
    reservePrice: { type: Number, required: true },
    finalPrice: { type: Number, required: true,default:0},
    currency: { type: String, required: true , default:Currency.USD},
    status: {type: String, required: false},
    buyer: {type: Schema.Types.ObjectId , ref: "bidder"}
  },{versionKey:false});

export default model('good', goodSchema)