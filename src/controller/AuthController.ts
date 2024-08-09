import { z } from "zod";
import { db } from "../database";
import { Request, Response } from "express";
import { bcryptComparePassword } from "../utils/Bcrypt";
import { generateToken } from "../utils/Jwt";

export class AuthController{
    async login(request: Request, response: Response){
        console.log("dhgceicyewhiewceh")
        const userSchema = z.object({
            identifier: z.string(),
            password: z.string()
        });

        const { identifier, password } = userSchema.parse(request.body);
        
        const user = await db.user.findFirst({
            where:{
                OR: [
                    { name:identifier },
                    { phone:identifier }
                 ],
                verified: true
            }
        });
        
        if(!user){
            return response.status(404).send("Identifier ou Password invalid.")
        }

        if(!(await bcryptComparePassword(password, user.password))){
                return response.status(404).send("Identifier ou Password invalid.")
            }
        const token = generateToken(user.id)

        const findUser =await db.freelancer.findUnique({
            where: {
                userId:user.id
            }
        });

        if(findUser){
            return response.status(200).send({token: token,role:findUser.role }) 
        }
        return response.status(200).send({token: token, role:user.role })
    }


    async authOtp(request: Request, response: Response){
        const userSchema = z.object({
            otp: z.number(),
            phone: z.string()
        })

        const { otp, phone } = userSchema.parse(request.body);

        const user = db.user.findUnique({
            where: {
                phone
            }
        });

        if(!user){
            return response.status(404).send({error: 'User not found'});
        }

        const verifyuser = await db.user.update({
            where:{
                phone
            },
            data:{
                verified: true
            }
        });

        return response.status(200).send(verifyuser);
    }
}