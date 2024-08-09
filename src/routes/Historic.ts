import express from "express";
import { HistoricController } from "../controller/HistoricController";

const router = express.Router();

const historicController = new HistoricController();
router.get("/", (request,response)=> historicController.show(request,response))

module.exports = router;