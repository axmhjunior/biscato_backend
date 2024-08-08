import express from 'express';
import { FeedbackController } from '../controller/FeedbackController';
import { AuthRoute } from '../middlewares/Auth';

const route = express.Router();

const feedbackController = new FeedbackController();

route.post('/', AuthRoute, (request, response)=> feedbackController.create(request, response));
route.delete('/:id', AuthRoute, (request, response)=> feedbackController.delete(request, response));

module.exports = route