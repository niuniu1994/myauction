import { app, startFastify } from "../lib/fastify";
import { assert } from "chai";
import { Good } from "../models/good";
import { Schema } from "mongoose";
import { dataBaseConnect } from "./helper";

describe("test goodController",  async () => {
   


    const id = "61d3559d5d27849028b497c1";

   
 
    it("when findAllGoods should return 200",async ()=>{
        await app.inject({
            method: 'GET',
            url: `/v1/goods`
        }).then(rep => {
            assert.equal(rep.statusCode,200)
        })
    })
     
    it("when findGoodById should return 200",async ()=>{
        await app.inject({
            method: 'GET',
            url: `/v1/goods/${id}`
        }).then(rep => {
            assert.equal(rep.statusCode,200)
        })
    })



  

})
