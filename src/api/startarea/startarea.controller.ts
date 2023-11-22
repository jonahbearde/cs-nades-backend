import { Request, Response, NextFunction } from "express"
import { findStartAreas } from "./startarea.service"

export async function getStartAreasHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = req.query
		console.log('query', query)
    const startAreas = await findStartAreas({ ...query })
    res.json(startAreas)
  } catch (error) {
    next(error)
  }
}
