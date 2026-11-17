// lib de hospedagem de imagens
import { v2 as cloudnary} from "cloudinary"

cloudnary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_APY_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
})

export default { cloudnary }