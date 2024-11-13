// src/routes/postRoutes.ts
import express from "express";
import * as postController from "../controllers/post.controller";

export const postRouter = express.Router();

// Rota para criar um novo post
postRouter.post("/create", postController.createPost);

// Rota para listar todos os posts
postRouter.get("/all", postController.getAllPosts);

// Rota para obter um post específico pelo ID
postRouter.get("/get/:id", postController.getPostById);

// Rota para atualizar um post existente
postRouter.put("/update/:id", postController.updatePost);

// Rota para deletar um post existente
postRouter.delete("/delete/:id", postController.deletePost);
