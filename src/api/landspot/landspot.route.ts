import { Router } from "express"
import * as LandSpotHandlers from "./landspot.controller"

const router = Router()

router.get("/", LandSpotHandlers.getLandSpotsHandler)

export default router