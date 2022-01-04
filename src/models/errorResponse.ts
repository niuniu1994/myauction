import {StatusCodes} from 'http-status-codes';

export interface errorResponse{
    message:string,
    code:StatusCodes
}