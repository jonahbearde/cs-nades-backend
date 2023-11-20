import { Router } from "express";
import * as NadeHandlers from './nade.controller'

const router = Router()

router.post(
	'/create',
	NadeHandlers.createNadeHandler
)

export default router