import { app, startFastify } from "../lib/fastify";
import { assert } from "chai";
import { Good } from "../models/good";
import { Schema } from "mongoose";
import { dataBaseConnect } from "./helper";

describe("test auctionController",  async () => {
    before(async function(){
        await startFastify()
        await dataBaseConnect()
    })

    const id = "622cc7332b19ff745c9d36bc";


    it("when findAllAuctions should return 200",async ()=>{
        await app.inject({
            method: 'GET',
            url: `/v1/auctions`
        }).then(rep => {
            assert.equal(rep.statusCode,200)
        })
    })
     
    it("when findAuctionById should return 200",async ()=>{
        await app.inject({
            method: 'GET',
            url: `/v1/auctions/${id}`
        }).then(rep => {
            assert.equal(rep.statusCode,200)
        })
    })

})
