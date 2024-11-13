// External Dependencies
import express from "express";
// Global Config
export const usersRouter = express.Router();
usersRouter.use(express.json());
// Configurações para o JWT
// Cadastro de Usuários
usersRouter.post("/register", async (req, res) => {
    console.log("register: " + req + res);
});
// Login de Usuários
usersRouter.post("/login", async (req, res) => {
    console.log("login: " + req + res);
});
