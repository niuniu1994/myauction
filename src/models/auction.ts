
import { model, Schema, Types } from "mongoose"
import bidder from "./bidder";
import good from "./good";

// export interface Auction {
//     _id: Schema.Types.ObjectId,
//     auctionName: string,
//     theme: string,
//     startTime: Schema.Types.Date,
//     endTime: Schema.Types.Date,
//     goods: Types.Array<string> | null,
//     bidders: Types.Array<string> | null
// }

const auctionSchmema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    auctionName: { type: String, required: true },
    theme: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    goods:  [{ type: Schema.Types.ObjectId, ref: 'good' ,default:[]}],
    bidders: [{ type: Schema.Types.ObjectId, ref: 'bidder' ,default:[] }],
  });
                      
  export default model('auction', auctionSchmema)