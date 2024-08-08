import express from 'express';
import { FreelancerController } from '../controller/FreelancerController';
import { AuthRoute } from '../middlewares/Auth';

const route = express.Router();

const freelancerController = new FreelancerController();

route.post('/',  (request, response) => freelancerController.create(request, response));
route.post('/location', AuthRoute, (request, response) => freelancerController.location(request, response));
route.put('/', AuthRoute, (request, response) => freelancerController.update(request, response));
route.get('/', (request, response) => freelancerController.notification(request, response));
route.put('/check/job/:id', (request, response) => freelancerController.notification(request, response));

module.exports = route;