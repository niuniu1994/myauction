import c from 'config';
import {StatusCodes} from 'http-status-codes';

export default class ResponseTemplate{
    code: StatusCodes;
    msg: string;
    data?: any;

    constructor(code:StatusCodes, msg: string, data:any){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}