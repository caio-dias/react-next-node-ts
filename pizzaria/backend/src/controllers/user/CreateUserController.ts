import { Request, Response } from "express"
import { CreateUserService } from "../../services/user/CreateUserService"

class CreateUserController {
  async handleUser(req: Request, res: Response) {
    //const { name, email, password } = req.body
    const createUserService = new CreateUserService()
    const user = await createUserService.execute()

    res.json({message: user})
  }
}

export { CreateUserController }