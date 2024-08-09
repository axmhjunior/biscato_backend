import express from 'express';
import { ServiceController } from '../controller/ServiceController';
import { AuthRoute } from '../middlewares/auth';

const router = express.Router();

const serviceController = new ServiceController();

router.post('/', AuthRoute , (request, response)=> {serviceController.requestService(request, response)});
router.put('/:id', AuthRoute , (request, response)=> {serviceController.checkJob(request, response)});
router.put('/job/done/:id', AuthRoute , (request, response)=> {serviceController.doneJob(request, response)});


module.exports = router;