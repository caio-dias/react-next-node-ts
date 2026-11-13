import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface Payload {
  // subject = id do usuario
  sub: string
}

export function checkAuthenticate(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization

  if(!authToken) {
    res.status(401).json({
      error: 'Usuario não autenticado'
    })
    return
  }

  const [, token] = authToken.split(" ")
  
  try {
    const { sub } = verify(token!, process.env.JWT_SECRET as string) as Payload
    req.user_id = sub
    next()
  } catch (error) {
    res.status(401).json({
      error: 'Token invalido'
    })
  }
}