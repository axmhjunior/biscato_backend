import express from 'express';
import { AdmController } from '../controller/AdmController';

const route = express.Router();

const admController = new AdmController();

route.post('/', (request, response)=> admController.create(request, response));

module.exports = route