import {Router} from "express"
import * as service from "./app.service.js"
import authentication from "../middleware/auth.middleware.js"
const router= Router()
router.get("/balance", authentication, service.Balance)
router.post("/deposit", authentication, service.Deposit)
router.post("/withdraw", authentication, service.Withdraw)
router.post("/transfer", authentication, service.Transfer)
export default router;