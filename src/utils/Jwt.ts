import jwt ,{ JwtPayload } from 'jsonwebtoken'
import { TokenConfig } from '../config/token';
import { object } from 'zod';

export const generateToken = (id:string)=>{
    const token = jwt.sign({expiressIn: TokenConfig.expiressIn,
        id: id}, TokenConfig.secret);

        return token;
}

export const decodeToken = (token:string)=>{
    const decoded = jwt.verify(token, TokenConfig.secret); 
    console.log(decoded)
    return decoded.id;
}