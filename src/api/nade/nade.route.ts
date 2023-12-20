import { Router } from "express"
import * as NadeHandlers from "./nade.controller"

const router = Router()

router.post("/create", NadeHandlers.createNadeHandler)

router.get("/", NadeHandlers.getNadesHandler)

export default router
