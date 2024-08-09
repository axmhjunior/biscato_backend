import { Request, Response } from "express";

import { db } from "../database";

export class CategoryController {
  async show(response: Response) {
    const category = await db.serviceCategory.findMany({
        select: {
            id: true, 
            name: true
        }
    });

    response.status(200).send(category)
  }
}
