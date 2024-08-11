import { db } from "../database";
import { CreateUserInputDTO, UpdateUserInputDTO } from "../dtos/user.dto";

export class UserRepository {
  async save(data: CreateUserInputDTO) {
    return await db.user.create({
      data: {
        name: data.name,
        phone: data.phone,
        password: data.password,
      },
    });
  }
  async updateById(id: string, data: UpdateUserInputDTO) {
    return await db.user.update({
      where: {
        id,
      },
      data,
    });
  }
  async findUserByName(name: string) {
    return await db.user.findUnique({
      where: {
        name,
      },
    });
  }
  async findUserByNameOrPhone(identifier: string) {
    return await db.user.findFirst({
      where: {
        OR: [{ name: identifier }, { phone: identifier }],
        verified: true,
      },
    });
  }
  async findUserByPhone(phone: string) {
    return await db.user.findUnique({
      where: {
        phone,
      },
    });
  }
  async findUserById(id: string) {
    return await db.user.findUnique({
      where: {
        id,
      },
    });
  }
  async findAll() {
    return await db.user.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
      },
    });
  }
  async remove(id: string) {
    return await db.user.delete({
      where: {
        id,
      },
    });
  }
}
