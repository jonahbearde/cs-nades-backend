import { Request, Response, NextFunction } from "express"
import { findLandSpots } from "./landspot.service"

export async function getLandSpotsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = req.query
    const landSpots = await findLandSpots({ ...query })
    res.json(landSpots)
  } catch (error) {
    next(error)
  }
}
