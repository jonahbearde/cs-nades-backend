import {
  v2 as _cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
  UploadApiOptions,
} from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

const cloudinary = () => {
  _cloudinary.config({
    cloud_name: process.env.CloudinaryCloudName,
    api_key: process.env.CloudinaryApiKey,
    api_secret: process.env.CloudinaryApiSecret,
  })

  return _cloudinary
}

export const uploadToCloudinary = (
  filePath: string,
  options: UploadApiOptions
): Promise<UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary().uploader.upload(
      filePath,
      { ...options, overwrite: true },
      (
        err: UploadApiErrorResponse | undefined,
        data: UploadApiResponse | undefined
      ) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      }
    )
  })
}
