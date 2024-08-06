import express from 'express';
import { FreelancerController } from '../controller/FreelancerController';

const route = express.Router();

const freelancerController = new FreelancerController();

route.post('/', (request, response) => freelancerController.create(request, response));
route.put('/', (request, response) => freelancerController.update(request, response))

module.exports = route;