import express from 'express';
import { ServiceController } from '../controller/ServiceController';
import { AuthRoute } from '../middlewares/auth';

const router = express.Router();

const serviceController = new ServiceController();

router.post('/', AuthRoute , (request, response)=> {serviceController.requestService(request, response)});
router.put('/', AuthRoute , (request, response)=> {serviceController.checkJob(request, response)});


module.exports = router;