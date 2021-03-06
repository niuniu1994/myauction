import { Schema, model, Types } from 'mongoose';

export interface Bidder{
  _id: Schema.Types.ObjectId | null,
  firstName:string,
  lastName:string,
  email:string,
  dateOfBirth:string,
  phone: string,
  password: string
}

const bidderSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    phone: { type: String, required: true },
    password: {type: String, required: true}
  },{versionKey:false});

export default model('bidder', bidderSchema)