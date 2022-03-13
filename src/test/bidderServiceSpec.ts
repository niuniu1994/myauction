
import { assert } from "chai";
import * as bidderService from "../services/bidderService"
import { dataBaseConnect } from "./helper";

describe("bidderService test", () => {
    before(function(){
        dataBaseConnect()
    })

    const id = "61f01f3c9268d92b2cd1a3fd";
    it("when find bidder with id returb 1 item" ,async () => {
        bidderService.getBidderById(id).then(value => {
            assert(value._id==id)
        })
    })
}) 