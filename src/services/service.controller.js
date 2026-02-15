import {Router} from "express"
import * as service from "./app.service.js"
import authentication from "../middleware/auth.middleware.js"
const router= Router()
router.post("/balance", authentication, service.Balance)
router.post("/deposit", authentication, service.Deposit)
export default router;