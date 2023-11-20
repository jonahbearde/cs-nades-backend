import * as z from "zod"
import { WithId } from "mongodb"
import { db } from "../../db"

export const Nade = z.object({
  map: z.string(),
  nadeType: z.string(),
  team: z.string(),
  movement: z.string(),
  throwType: z.string(),
  spcmd: z.string(),
  description: z.string(),
  startAreaId: z.string(),
  landSpotId: z.string(),
  videoUrl: z.string(),
	videoPublicId: z.string(),
	lineupImagePublicId: z.string(),
	resultImagePublicId: z.string(),
  lineupImageUrl: z.string(),
  resultImageUrl: z.string(),
})

export type Nade = z.infer<typeof Nade>

export type NadeWithId = WithId<Nade>

export const Nades = db.collection<Nade>("nades")
