// src/controllers/postController.ts
import { Request, Response } from "express";
import Post from "../models/Post";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;
    const post = await Post.create({ title, content, userId });
    return res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o post: " + error });
    return;
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar os posts: " + error });
    return;
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post não encontrado." });
    }
    return res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter o post: " + error });
    return;
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post não encontrado." });
    }
    post.title = title;
    post.content = content;
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o post: " + error });
    return;
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post não encontrado." });
    }
    await post.destroy();
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o post: " + error });
    return;
  }
};
