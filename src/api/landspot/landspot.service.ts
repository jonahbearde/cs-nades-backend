import { FindOptions, Filter } from "mongodb"
import { LandSpot, landSpots } from "./landspot.model"

export async function findLandSpots(filter: Filter<LandSpot>, options?: FindOptions) {
	return landSpots.find(filter, options).toArray()
}