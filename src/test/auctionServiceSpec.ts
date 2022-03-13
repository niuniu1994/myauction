import { Schema, Types } from "mongoose";
import { Auction } from "../models/Auction";


import * as auctionService from "../services/auctionService"
import { assert } from "chai";
import {dataBaseClose, dataBaseConnect} from "./helper"


describe('', () => {

    before(function(){
        dataBaseConnect()
    })

   
    const goods = new Array<Types.ObjectId>()
    goods.push(new Types.ObjectId("61d3559d5d27849028b497c1"))

    const bidders = new Array<Types.ObjectId>()
    bidders.push(new Types.ObjectId("61f01f3c9268d92b2cd1a3fd"))

    const id = "622c90ce7036300ff3216476"
    const auction:Auction = {
        "auctionName": "Auction: Car1",
        "theme": "Car",
        "startTime": "2022-04-12T09:00:00.000+00:00",
        "endTime": "2022-04-12T10:00:00.000+00:00",
        "goods": goods,
        "bidders": bidders
    }

    const auction1:Auction = {
        "_id":"622c90ce7036300ff3216476",
        "auctionName": "Auction: Car11212",
        "theme": "Car",
        "startTime": "2022-04-13T09:00:00.000+00:00",
        "endTime": "2022-04-12T10:00:00.000+00:00",
        "goods": goods,
        "bidders": bidders
    }

    it("when add auction return id not null",async () => {
        const newAuction =auction;
        newAuction._id = new Types.ObjectId(id)
        auctionService.addAuction(auction).then(value => {
            assert.isNotNull(value)
        })
    })

    it("when getAuctionById return element with id correct", async () => {
        const data =await auctionService.getAuctionById("622cc7332b19ff745c9d36bc")
        assert.equal(data._id,"622cc7332b19ff745c9d36bc") 
    })

    it("when getAuctions return 2 element", async () => {
        const data =await auctionService.getAllAuctions()
        assert.equal(data.length,2) 
    })

    it("when updateAuctionById return result with name changed", async () => {
        const data =await auctionService.updateAuctionById(id,auction1)
        assert.equal(data.auctionName,"Auction: Car11212") 
    })


    it("when deleteAuctionById return 1 element", async () => {
        const data = await auctionService.deleteAuctionById(id)
        assert.equal(data.deletedCount,1) 
    })
})





