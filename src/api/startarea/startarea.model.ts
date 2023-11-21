import * as z from 'zod'
import { WithId } from 'mongodb'
import { db } from '../../db'


export const StartArea = z.object({
	callout: z.string(),
	map: z.string(),
	coordinates: z.string()
})

export type StartArea = z.infer<typeof StartArea>

export type StartAreaWithId = WithId<StartArea>

export const startAreas = db.collection<StartArea>('startareas')