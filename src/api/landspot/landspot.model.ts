import * as z from 'zod'
import { WithId } from 'mongodb'
import { db } from '../../db'

export const LandSpot = z.object({
	callout: z.string(),
	map: z.string(),
	coordinates: z.string(),
	type: z.string()
})

export type LandSpot = z.infer<typeof LandSpot>
export type LandSpotWithId = WithId<LandSpot>

export const landSpots = db.collection<LandSpot>('landspots')