import express from 'express'
import { UserController } from '../controller/UserController';
import { AuthRoute } from '../middlewares/auth';


const route = express.Router();

const userController = new UserController();


route.post('/', (request, response)=>{userController.create(request, response)});
route.put('/:id', AuthRoute, (request, response)=>{userController.update(request, response)});
module.exports = route;