import { Auctioneer } from "../models/auctioneer";
import { Bidder } from "../models/bidder";
import * as authService from "../services/authService"
import { assert } from "chai";
import { dataBaseClose, dataBaseConnect,  } from "./helper";
import * as fastify from "fastify";
import * as fs from 'fs';
import jwt from 'fastify-jwt';

describe("authService test", () => {

    before(function(){
        dataBaseConnect()
    })

  
    
    const bidder:Bidder = {
        "firstName": "TOM",
        "lastName": "z",
        "email": "tomz@gmail.com",
        "dateOfBirth": "1993-07-12",
        "phone": "+3312342189",
        "password": "123",
        "_id": null
    }

    const auctioneer:Auctioneer = {
        "auctioneerName": "admin1",
        "email": "admin1@gmail.com",
        "password": "123",
        "_id": null
    }

    const bidderEmail = "tomz@gmail.com"
    const bidderPassword = "123"

    const auctioneerEmail = "admin1@gmail.com"
    const auctioneerPassword = "123"

    it("when bidder login return not null" ,async () => {
        const data = await authService.bidderLogin(bidderEmail,bidderPassword)
        assert.isNotNull(data)
    })

    it("when bidder sign up with email already exist return null" ,async () => {
        const data = await authService.bidderSignup(bidder)
        assert.isFalse(data)
    })

    it("when bidder sign up with different already exist return null" ,async () => {
        bidder.email = Math.random() + "@" + Math.random() + ".com"
        const data = await authService.bidderSignup(bidder)
        assert.isTrue(data)
    })

    it("when auctionner login return not null" ,async () => {
        const data = await authService.auctioneerLogin(auctioneerEmail,auctioneerPassword)
    
    })

    it("when auctionner sign up with email already exist return null" ,async () => {
      
        const data = await authService.auctioneerSignup(auctioneer)
        assert.isFalse(data)

    })

    it("when auctionner sign up with different already exist return true" ,async () => {
        auctioneer.email = Math.random() + "@" + Math.random() + ".com"
       
        const data = await authService.auctioneerSignup(auctioneer)
        assert.isTrue(data)
    })
}) 