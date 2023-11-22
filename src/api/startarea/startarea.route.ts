import { Router } from "express"
import * as StartAreaHandlers from "./startarea.controller"

const router = Router()

router.get("/", StartAreaHandlers.getStartAreasHandler)

export default router
