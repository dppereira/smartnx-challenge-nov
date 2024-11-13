// src/controllers/commentController.ts
import { Request, Response } from "express";
import Comment from "../models/Comment";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, postId } = req.body;
    const comment = await Comment.create({ content, postId });
    return res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o comentário: " + error });
    return;
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.findAll({ where: { postId } });
    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar os comentários: " + error });
    return;
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado." });
    }
    comment.content = content;
    await comment.save();
    return res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o comentário: " + error });
    return;
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado." });
    }
    await comment.destroy();
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o comentário: " + error });
    return;
  }
};
