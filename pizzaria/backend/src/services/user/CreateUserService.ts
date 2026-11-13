import prismaClient from "../../prisma/index"
import { hash } from 'bcryptjs'

interface CreateUserProps {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute ({ name, email, password }: CreateUserProps) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email }
    })

    if (userAlreadyExists) {
      throw('Usuario já cadastrado no sistema!')
    }

    // criptografia da senha
    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      // data enviada para o banco de dados
      data: {
        name,
        email,
        password: passwordHash,
      },
      // apenas os dados que o serviço retornará
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })

    return user
  }
}

export { CreateUserService }