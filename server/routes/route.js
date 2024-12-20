import express from "express";
import { sendAllData } from "../controller/data-controller.js";


const router = express.Router();

router.get("/api", sendAllData);


export default router;