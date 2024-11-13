import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { collections } from "../config/dbMongo"; // Conexão MongoDB
import User from "../models/User"; // Modelo de Usuário

// Configurações do JWT
const passJWT = process.env.JWT_SECRET;
const tokenExp = process.env.TOKEN_EXPIRATION;

// Função para registrar um usuário
export const register = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { name, username, password } = req.body;

    if (!collections.users) {
      res.status(500).send("Coleção de usuários não encontrada.");
      return;
    }

    // Verifica se o usuário já existe
    const existingUser = await collections.users.findOne({ username });
    if (existingUser) {
      res.status(400).send("Usuário já cadastrado.");
      return;
    }

    // Gera o hash da senha
    const passHash = await bcrypt.hash(password, 10);

    // Cria um novo usuário e insere no banco de dados
    const newUser = new User(name, username, passHash);
    const result = await collections.users.insertOne(newUser);

    res
      .status(201)
      .send(`Usuário criado com sucesso com id ${result.insertedId}`);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).send("Erro ao registrar usuário.");
  }
};

// Função para fazer login
export const login = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!collections.users) {
      res.status(500).send("Coleção de usuários não encontrada.");
      return;
    }

    if (!passJWT) {
      res.status(500).send("Segredo JWT não configurado.");
      return;
    }

    // Verifica se o usuário existe
    const user = (await collections.users.findOne({ username })) as User;
    if (!user) {
      res.status(400).send("Usuário ou senha incorretos.");
      return;
    }

    // Compara a senha fornecida com o hash armazenado
    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (!senhaCorreta) {
      res.status(400).send("Usuário ou senha incorretos.");
      return;
    }

    // Gera o token JWT com validade de 1 hora
    const token = jwt.sign({ id: user._id, username: user.username }, passJWT, {
      expiresIn: tokenExp,
    });

    res.status(200).send({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).send("Erro ao fazer login.");
  }
};

// Exportando as funções para uso no roteador
export default { register, login };
