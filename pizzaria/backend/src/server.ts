// permitindo qualquer ip fazer request na api
import cors from 'cors'

// variaveis de ambiente
import { config as dotenvconfig }  from 'dotenv'

import express, { NextFunction, Request, Response } from 'express'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

// tratativas de erros
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({
      error: error.message,
    })
  }

  return res.status(500).json({
    error: "Internal server error!",
  })
})

dotenvconfig()

const PORT = process.env.PORT! || 3333

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})