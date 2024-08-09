import express from 'express';
import { AdmController } from '../controller/AdmController';
import { AuthRoute } from '../middlewares/Auth';

const route = express.Router();

const admController = new AdmController();

route.post('/', (request, response)=> admController.create(request, response));
route.put('/', AuthRoute, (request, response)=> admController.update(request, response));
route.delete('/',AuthRoute ,(request, response)=> admController.delete(request, response));
route.get("/", (request, response)=> admController.getAllClient(request, response));
route.get("/freelancers", (request, response)=> admController.getAllFreelancer(request, response));


module.exports = route