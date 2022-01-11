import { model, Schema } from "mongoose";

export interface Auctioneer{
    _id: Schema.Types.ObjectId,
    auctioneerName:string,
    email:string,
    password: string
}

const auctioneerSchmema = new Schema({
    auctioneerName: { type: String, required: true },
    email: {type: String, required: true},
    password: {type: String, required: true}
  },{versionKey:false});
                      
export default model('auctioneer', auctioneerSchmema)