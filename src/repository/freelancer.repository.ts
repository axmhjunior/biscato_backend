import { db } from "../database";
import {  UpdateAdmInputDTO } from "../dtos/adm.dto";
import { FreelancerInputDTO, UpdateFreelancerInputDTO } from "../dtos/freelancer.dto";

export class FreelancerRepository {
  async save(userId: string,data: FreelancerInputDTO) {
    return await db.freelancer.create({
            data: {
                userId,
               documentId: data.documentId,
                documentType:data.documentType, 
                serviceCategory:data.serviceCategory, 
                description:data.description
              },
        
    });
  }

  async updateById(id: string, data: UpdateFreelancerInputDTO) {
    return await db.$transaction([
      db.user.update({
        where: { id },
        data: {
          name: data.name,
          phone: data.phone,
          password: data.password,
        },
      }),
      db.freelancer.update({
        where: {
          userId: id,
        },
        data: {
          description: data.description,
          documentType: data.documentType,
          documentId: data.documentId,
          serviceCategory: data.serviceCategory,

        },
      }),
    ]);
  }

  async findFreelancerById(id: string) {
    return await db.freelancer.findUnique({
      where: {
        userId:id,
      },
    });
  }
  async findAll() {
    return await db.$transaction([
        db.user.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
  }}),
      db.freelancer.findMany({
        select: {
            description:true,
            documentType:true,
            serviceCategory:true,
            documentId:true,
        

        }
      })
    ]);
  }
  async remove(userId: string) {
    return await db.$transaction([
      db.freelancer.delete({
        where: {
          userId,
        },
      }),
      db.user.delete({
        where: {
          id:userId,
        },
      }),
    ]);
  }
}
