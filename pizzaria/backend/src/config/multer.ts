// lib de filtro de imagens, utilizando tipo formdata
import multer from "multer";

// usar o memoryStorage para manter o arquivo em memoria e enviar para o cloudnary
export default {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
  fileFilter: (_req: any, file: Express.Multer.File, cb: any) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Formato de imagem invalido, use jpg, jpeg ou png'))
    }
  },
}