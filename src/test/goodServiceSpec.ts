import { Schema } from "mongoose";
import { Good } from "../models/good";
import * as goodService from "../services/goodsService"
import { assert } from "chai";
import { dataBaseConnect } from "./helper";

describe("goodService test", () => {
    before(function(){
        dataBaseConnect()
    })

    const good:Good = {
        "goodName": "Bmw E530",
        "startingPrice": 40000,
        "reservePrice": 40000,
        "finalPrice": 0,
        "currency": "USD",
        "status": "available",
        "buyer": null,
        _id: null
    }
    const id = "61d352425d27849028b497bf";
    it('when findAllGoods should return 2 items',async () => {
       goodService.findAllGoods().then(value => {
           assert.equal(value.length,2)
       })
    })

    it('when findGoodById with id 61d352425d27849028b497bf should return 1 item',async () => {
        goodService.findGoodById(id).then(value => assert.equal(value._id,id))
    })
    
    it('when updateGoodById should return 1 item',async () => {
        good.startingPrice = Math.random()
        goodService.updateGoodById(id,good).then(value => assert.equal(value.modifiedCount,1))
    })

    it('when deleteGoodById should return 1 item',async () => {

        goodService.deleteGoodById(id).then(value => assert.equal(value.deletedCount,1))
    })

    it('when addGood should return 1 item',async () => {
        good._id = new Schema.Types.ObjectId(id)
        goodService.addGood(good).then(value => assert.equal(value.modifiedCount,1))
    })
});