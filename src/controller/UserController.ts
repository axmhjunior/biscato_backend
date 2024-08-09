import { Request, Response } from "express";
import { otpGenerator } from "../utils/OtpGenerator";
import { z } from "zod";
import { db } from "../database";
import { encryptPassword } from "../utils/Bcrypt";
import { messageService } from "../utils/twilio";
import { decodeToken, generateToken } from "../utils/Jwt";



export class UserController{
    async create(request: Request, response: Response){
        const userSchema = z.object({
            name: z.string(),
            phone: z.string().regex(/^8[2-7]\d{7}/),
            password: z.string()
        });

        const { name, phone, password } = userSchema.parse(request.body);


        // check if user already exits
        const userName = await db.user.findUnique({
            where: {
                name
            }
        });

        if(userName){
            return response.status(409).send("Username already exits");
        }


        const userPhone = await db.user.findUnique({
            where: {
                phone
            }
        });

        if(userPhone){
            return response.status(409).send("Phone already exits");
        }

        const encryptedPassword = await encryptPassword(password);

        const saveuser = await db.user.create({
            data:{
                name, 
                phone, 
                password:encryptedPassword
            }
        });


        const otp = otpGenerator()

        messageService(`This your otp code: \n${otp}`, phone)
        console.log(otp)
        const token = generateToken(saveuser.id)
        return response.status(201).send({...saveuser, password:undefined, token:token})
    }


    async update(request: Request, response: Response){

        const id = request.params.id;

        const userSchema = z.object({
            name: z.string().optional(),
            phone: z.string().regex(/^8[2-7]\d{7}/).optional(),
            password: z.string().optional()
        });

        const { name, phone, password } = userSchema.parse(request.body); 

        // check id
        const userId = db.user.findUnique({
            where: {
                id
            }
        });

        if(!userId){
            return response.status(404).send('User not found');
        }

        let user: object | null;

        if(name){
            user = await db.user.findUnique({
            where: {
                name
            }
        });

        if(user){
            return response.status(409).send("Username already exits");
        }
    }


    if(phone){
        user = await db.user.findUnique({
            where: {
                phone
            }
        });

        if(user){
            return response.status(409).send("Phone already exits");
        }
}
        let encryptedPassword: string | undefined;

        if(password){
            encryptedPassword = await encryptPassword(password);
        }
        const updateuser = await db.user.update({
            where:{
                id
            },
            data: {
                name, 
                phone,
                password:encryptedPassword
            }
        })
        
        return response.status(200).send(updateuser)
    }


    async delete(request: Request, response: Response){
        const id = request.params.id;  
        
        // check id
        const userId = db.user.findUnique({
            where: {
                id
            }
        });

        if(!userId){
            return response.status(404).send('User not found');
        }
        
        await db.user.delete({
            where:{
                id
            }
        });

        return response.status(200).send({})
    }
    
    
    // async cria(request: Request, response: Response) {
        
       
    //         const [, token] = z.string().parse(request.headers.authorization).split(" ");
    //         const userId = decodeToken(token); 


    //         const userSchema = z.object({
    //             latitude: z.number(),
    //             longitude: z.number(),
    //         });


    //         const { latitude, longitude } = userSchema.parse(request.body);


    //         const save = await db.freelancerLocation.create({
    //             data: {
    //                 userId,
    //                 latitude,
    //                 longitude,
    //             },
    //         });

    //         response.send(save);

    // }
}


