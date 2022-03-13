import { startFastify,app } from "../lib/fastify";
import {dataBaseConnect} from "./helper"
import { assert } from "chai";
import * as goodService from "../services/goodsService"

describe("test bidddingController",  () => {
    

    it("when offer price then the price of good return response code 200",async ()=>{
        const token = await app.jwt.sign({ role:'bidder',bidderId:"61f01f3c9268d92b2cd1a3fd",email:"tomz@gmail.com" }, {
            expiresIn: 86400 // 24 hours
        });
        const good = await goodService.findGoodById("61d3559d5d27849028b497c1")
        await app.inject({
            method: 'POST',
            url: `/v1/bidding/auction/622cc7332b19ff745c9d36bc/good/61d3559d5d27849028b497c1/${ good.finalPrice + 1}`,
            headers: {'Authorization':token}
        }).then(rep => {
            assert.equal(rep.statusCode,200)
        })
    })

})
