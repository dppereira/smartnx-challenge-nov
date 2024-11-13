// src/routes/commentRoutes.ts
import express from "express";
import * as commentController from "../controllers/comment.controller";

export const commentRouter = express.Router();

// Rota para criar um novo comentário
commentRouter.post("/create", commentController.createComment);

// Rota para listar todos os comentários de um post específico
commentRouter.get("/list-post/:postId", commentController.getCommentsByPost);

// Rota para atualizar um comentário específico
commentRouter.put("/update/:id", commentController.updateComment);

// Rota para deletar um comentário específico
commentRouter.delete("/delete/:id", commentController.deleteComment);
