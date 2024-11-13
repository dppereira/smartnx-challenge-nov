import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware de autenticação JWT
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Obtém o token do cabeçalho Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send("Acesso negado. Token não fornecido.");
    return;
  }

  // Verifica o token JWT
  jwt.verify(
    token,
    process.env.JWT_SECRET || "",
    (err: unknown, user: unknown) => {
      if (err) {
        return res.status(403).send("Token inválido.");
      }

      // Adiciona o usuário à requisição, caso o token seja válido
      req.user = user;
      next(); // Passa o controle para o próximo middleware ou rota
    },
  );
};
