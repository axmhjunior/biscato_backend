import { db } from "../database";
import { CreateAdmInputDTO, UpdateAdmInputDTO } from "../dtos/adm.dto";

export class AdmRepository {
  async save(userId: string, email: string) {
    return await db.administratrator.create({
      data: {
        email,
        userId,
      },
    });
  }

  async updateById(id: string, data: UpdateAdmInputDTO) {
    return await db.$transaction([
      db.user.update({
        where: { id },
        data: {
          name: data.name,
          phone: data.phone,
          password: data.password,
        },
      }),
      db.administratrator.update({
        where: {
          userId: id,
        },
        data: {
          email: data.email,
        },
      }),
    ]);
  }

  async findAdmByEmail(email: string) {
    return await db.administratrator.findUnique({
      where: {
        email,
      },
    });
  }

  async findAdmById(userId: string) {
    return await db.administratrator.findUnique({
      where: {
        userId,
      },
    });
  }

  async remove(userId: string) {
    return await db.$transaction([
      db.administratrator.delete({
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
