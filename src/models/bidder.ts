import { Schema, model, Types } from 'mongoose';
import auction from './auction';
import good from './good';
// export interface Bidder{
//   _id: Schema.Types.ObjectId,
//   firstName:string,
//   lastName:string,
//   email:string,
//   dateOfBirth:string,
//   phone: string,
//   password: string,
//   auctions: Types.Array<string>,
//   goods:Types.Array<string>
// }

const bidderSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    phone: { type: String, required: true },
    password: {type: String, required: true},
    auctions: [{ type: Schema.Types.ObjectId, ref: 'auction' }],
    goods: [{ type: Schema.Types.ObjectId, ref: 'good' }],
  });

export default model('bidder', bidderSchema)