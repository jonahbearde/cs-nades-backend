import { Request, Response, NextFunction } from "express"
import { NadeFormData } from "../../types/nade"
import { Nade } from "./nade.model"
import formidable, { Fields } from "formidable"
import { uploadToCloudinary } from "../../utils/cloudinary"
import { createNade, findNades } from "./nade.service"
import { UploadApiResponse } from "cloudinary"

type NadeFields =
  | "map"
  | "nadeType"
  | "team"
  | "movement"
  | "throwType"
  | "spcmd"
  | "description"
  | "startAreaId"
  | "landSpotId"

export async function createNadeHandler(
  req: Request<any, NadeFormData>,
  res: Response,
  next: NextFunction
) {
  const form = formidable({ multiples: false })
  form.parse(req, async (err, fields: Fields<NadeFields>, files) => {
    if (err) {
      next(err)
      return
    }

    const nadeToCreate: Nade = {
      map: "",
      nadeType: "",
      team: "",
      movement: "",
      throwType: "",
      spcmd: "",
      description: "",
      startAreaId: "",
      landSpotId: "",
      videoUrl: "",
      videoPublicId: "",
      lineupImagePublicId: "",
      resultImagePublicId: "",
      lineupImageUrl: "",
      resultImageUrl: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log("try uploading")
    try {
      for (let key in files) {
        const file = files[key] as formidable.File[]

        const { secure_url: url, public_id: id } = (await uploadToCloudinary(
          file[0].filepath,
          {
            resource_type: key === "video" ? "video" : "image",
            folder: key === "video" ? "cs-nades/videos" : "cs-nades/images",
          }
        )) as UploadApiResponse

        if (key === "video") {
          nadeToCreate.videoUrl = url
          nadeToCreate.videoPublicId = id
        } else if (key === "lineupImage") {
          nadeToCreate.lineupImageUrl = url
          nadeToCreate.lineupImagePublicId = id
        } else if (key === "resultImage") {
          nadeToCreate.resultImageUrl = url
          nadeToCreate.resultImagePublicId = id
        }
      }

      const result = await createNade({
        ...nadeToCreate,
        ...Object.fromEntries(
          Object.entries(fields as { [key: string]: string[] }).map(
            ([k, v]) => [k, v[0]]
          )
        ),
      })

      if (result.acknowledged) {
        res.status(201).send("success")
      } else {
        res.status(500).send("Nade not created")
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
}

export async function getNadesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = req.query
    const cursor = findNades({ ...query })
    const nades = await cursor.toArray()
    res.json(nades)
  } catch (error) {
    next(error)
  }
}
