import { compare } from "bcryptjs"
import prismaClient from "../../prisma"
import { sign } from "jsonwebtoken"

interface AuthUserProps {
  email: string
  password: string
}

class AuthUserService {
  async execute ({ email, password }: AuthUserProps) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      }
    })
    
    if (!user) {
      throw new Error("Email ou senha invalidos!")
    }

    const isPasswordCorrect = await compare(password, user.password)

    if (!isPasswordCorrect) {
      throw new Error("Email ou senha invalidos!")
    }

    // gera token jwt, para ter um login seguro e autenticado
    const token = sign({
      name: user.name,
      email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "3d",
      })


    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,  
    }
  }
}

export { AuthUserService }