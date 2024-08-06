import { Request, Response } from "express";
import { z } from "zod";
import { db } from "../database";
import { encryptPassword } from "../utils/Bcrypt";



export class AdmController{
    async create(request: Request, response: Response){
        const admSchema = z.object({
            name: z.string(),
            phone: z.string().regex(/^8[2-7]\d{7}/),
            email: z.string().email(),
            password: z.string()
        });

        const { name, email, phone, password } = admSchema.parse(request.body);


        // check if user already exits
        const userName = await db.user.findUnique({
            where: {
                name
            }
        });


        if (userName){
            return response.status(409).send("Username already exits");
        }

        const userPhone = await db.user.findUnique({
            where: {
                phone
            }
        });


        if (userPhone){
            return response.status(409).send("User phone already exits");
        }


        const admEmail = await db.administratrator.findUnique({
            where: {
                email
            }
        });

        if(admEmail){
            return response.status(409).send("Email already exits");
        }


        const encryptedPassword = await encryptPassword(password);

        const saveUser = await db.user.create({
            data:{
                name, 
                phone, 
                password:encryptedPassword,
                verified:true
            }          
        })
        const saveAdm = await db.administratrator.create({
            data:{
                userId:saveUser.id, 
                email
            }
        });

        return response.status(201).send({...saveUser, password:undefined,...saveAdm})
    }


    async update(request: Request, response: Response){

        const id = request.params.id;

        const admSchema = z.object({
            name: z.string().optional(),
            phone: z.string().regex(/^8[2-7]\d{7}/).optional(),
            email: z.string().email().optional(),
            password: z.string().optional()
        });

        const { name, email, phone, password } = admSchema.parse(request.body); 

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


    if(email){
        user = await db.administratrator.findUnique({
            where: {
                email
            }
        });

        if(user){
            return response.status(409).send("Email already exits");
        }
}
        let encryptedPassword: string | undefined;

        if(password){
            encryptedPassword = await encryptPassword(password);
        }
        const updateUser = await db.user.update({
            where:{
                id
            },
            data: {
                name, 
                phone,
                password:encryptedPassword
            }
        });

        const updateAdm = await db.administratrator.update({
            where:{
                userId:id
            },
            data: {
                email
            }
        });
        
        return response.status(200).send({
                                        ...updateUser, password:undefined,
                                        ...updateAdm, userId:undefined
                                     })
    }


    async delete(request: Request, response: Response){
        const id = request.params.id;  
        
        // check id
        const user = db.user.findUnique({
            where: {
                id
            }
        });

        if(!user){
            return response.status(404).send('user not found');
        }
        
        await db.user.delete({
            where:{
                id
            }
        });
        
        await db.administratrator.delete({
            where:{
                userId:id
            }
        });

        return response.status(200).send({})
    }
}