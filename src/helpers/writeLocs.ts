import fs from "fs"
import path from "path"
import { startAreas } from "../api/startarea/startarea.model"
import { landSpots } from "../api/landspot/landspot.model"

interface DataStartArea {
  map: string
  calloutName: string
  position: {
    x: number
    y: number
  }[]
}

interface DataLandSpot {
  map: string
  calloutName: string
  type: string
  position: {
    x: number
    y: number
  }
}

// pre-release function
export async function writeLocs() {
  const maps = [
    "mirage",
    "inferno",
    "ancient",
    "anubis",
    "nuke",
    "overpass",
    "vertigo",
  ]
  // read start areas data
  for (const map of maps) {
    try {
      const data = fs.readFileSync(
        path.join(__dirname, `../jsons/${map}_s.json`),
        "utf8"
      )

      const areas = JSON.parse(data) as DataStartArea[]

      const promises = areas.map((area) => {
        return new Promise(async (resolve, reject) => {
          try {
            const { map, calloutName: callout, position } = area
            const coordinates = position
              .map((pos) => `${pos.x},${pos.y}`)
              .join(";")

            const result = await startAreas.insertOne({
              map,
              callout,
              coordinates,
            })
            resolve(result)
          } catch (error) {
            reject(error)
          }
        })
      })

      await Promise.all(promises)
    } catch (error) {
      console.log(error)
    }
  }

  // read land spots data
  for (const map of maps) {
    try {
      const data = fs.readFileSync(
        path.join(__dirname, `../jsons/${map}_e.json`),
        "utf8"
      )

      const spots = JSON.parse(data) as DataLandSpot[]

      const promises = spots.map((spot) => {
        return new Promise(async (resolve, reject) => {
          try {
            const { map, calloutName: callout, position, type } = spot
            const coordinates = `${position.x},${position.y}`

            const result = await landSpots.insertOne({
              map,
              callout,
              coordinates,
              type,
            })
            resolve(result)
          } catch (error) {
            reject(error)
          }
        })
      })

      await Promise.all(promises)
    } catch (error) {
      console.log(error)
    }
  }
}
