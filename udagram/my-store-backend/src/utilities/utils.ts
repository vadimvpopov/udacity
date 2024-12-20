import express from 'express'
import { Dictionary } from 'express-serve-static-core';
import jwt, { JwtPayload } from 'jsonwebtoken'

const strToNumeric = (value: string): number => {
    if (!isNaN(Number(value))) return Number(value);
    return NaN;
}

const _verifyAuthToken = (req: express.Request) => {
    console.log("verifying authentication...");
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    //*-console.log(`verifying token for authHeader ${authorizationHeader}, ${process.env.TOKEN_SECRET}`);
    const decodedJwt = jwt.verify(token, process.env.TOKEN_SECRET as string);
    //@ts-ignore
    req.userId = decodedJwt["user"]["id"]; 
    //@ts-ignore
    //console.log(`userId passed: ${req.userId}, jwt: ${decodedJwt}`);
    return decodedJwt;
}
const verifyAuthToken = (req: express.Request, res: express.Response, next:any) => {
    try {
        console.log("verifying request for " + req.url);
        _verifyAuthToken(req);
        next();
    } catch (error) {
        console.log('Caught an error: ', error)
        res.status(401).json(`Error verifying authentication! ${error}`);
        //throw new Error(`Authorization failed ${(error as Error).message}`);
    }
}

const verifyAuthTokenAnCheckUser = (req: express.Request, res: express.Response, next:any) => {
    try {
        const jwt = _verifyAuthToken(req);
        
        //@ts-ignore
        //*-console.log(`UserId in jwt: ${jwt["user"]["id"]} and userId in request: ${req.params.userId}`);
        //@ts-ignore
        if (jwt['user']['id'] !== strToNumeric(req.params.userId)) { 
            throw Error(`Passed JWT doesnt correspond to the one in the request body!`);
        }
        

        next();
    } catch (error) {
        res.status(401).json(`Error verifying authentication! ${error}`);
    }
}

export {
    strToNumeric,
    verifyAuthToken,
    verifyAuthTokenAnCheckUser
}