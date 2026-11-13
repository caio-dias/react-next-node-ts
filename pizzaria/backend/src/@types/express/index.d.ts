// adicionando o user_id na interface do Request
declare namespace Express {
  export interface Request {
    user_id: string
  }
}