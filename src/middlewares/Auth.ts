import express, { Request, Response } from 'express';
import  jwt  from 'jsonwebtoken';
import { z } from "zod";
import { TokenConfig } from "../config/token"; 
import { ExecException } from 'child_process';


export function AuthRoute(request: Request, response: Response, next: (error?: ExecException) => void){
    const [,token] =z.string().parse(request.headers.authorization).split(' ');

    console.log(token, TokenConfig.secret)
    try { 
        jwt.verify(token, TokenConfig.secret)
        next()
    } catch (error) {
        console.log(error)
        return response.status(401).send({ error: 'Invalid token.' })
    }
    

}