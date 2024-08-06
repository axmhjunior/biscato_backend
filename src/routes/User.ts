import express from 'express'
import { UserController } from '../controller/UserController';


const route = express.Router();

const userController = new UserController();


route.post('/', (request, response)=>{userController.create(request, response)});
route.put('/:id', (request, response)=>{userController.update(request, response)});

module.exports = route;