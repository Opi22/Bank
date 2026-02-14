import { Router } from "express";
import * as auth from "./auth.Service.js"
const router =Router()
router.post("/register", auth.register)
export default router;