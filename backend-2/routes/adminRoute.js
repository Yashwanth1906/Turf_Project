import express from "express";
import { addTimeSlot } from "../controllers/adminController.js";
import { admindetail, adminlogin, adminregister } from "../controllers/adminDetailsController.js";
import { authMiddleWare } from "../middleware/auth.js";


const adminRouter = express.Router();


adminRouter.post("/addtime",authMiddleWare,addTimeSlot);
adminRouter.post("/register",adminregister);
adminRouter.post("/login",adminlogin);
adminRouter.get("/details",authMiddleWare,admindetail);

export default adminRouter