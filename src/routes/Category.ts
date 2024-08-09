import express from "express";
import { CategoryController } from "../controller/CategoryController";

const route = express.Router();

const categoryController = new CategoryController();

route.get("/", (request, response) => categoryController.show(response));

module.exports = route;
