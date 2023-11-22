import { FindOptions, Filter } from "mongodb"
import { StartArea, startAreas } from "./startarea.model"

export async function findStartAreas(filter: Filter<StartArea>, options?: FindOptions) {
	return startAreas.find(filter, options).toArray()
}
