import express from "express";
import * as dotenv from "dotenv";
import { connectToDatabasePostgres } from "./config/dbPg";
import { connectToDatabaseMongo } from "./config/dbMongo";
import { postsRouter } from "./routes/posts.router";
import { authRouter } from "./routes/auth.router";
import { commentRouter } from "./routes/comment.router";
import { authenticateJWT } from "./middleware/auth.middleware"; // Middleware para autenticação JWT

dotenv.config();

const app = express();

// Middleware de body parser para JSON
app.use(express.json());

connectToDatabaseMongo()
  .then(() => {
    console.log("MongoDB connected");
    // Rota pública de autenticação
    app.use("/api/auth", authRouter);

    connectToDatabasePostgres()
      .then(() => {
        // As rotas de posts e usuários precisam de autenticação JWT
        app.use("/api/posts", authenticateJWT, postsRouter); // Protege a rota de posts
        app.use("/api/comments", authenticateJWT, commentRouter); // Protege a rota de posts

        // Inicia o servidor após as conexões com os bancos de dados
        app.listen(process.env.PORT, () => {
          console.log(`Server started at http://localhost:${process.env.PORT}`);
        });
      })
      .catch((error: Error) => {
        console.error("PostgreSQL connection failed", error);
        process.exit(1); // Encerra a aplicação caso o PostgreSQL não se conecte
      });
  })
  .catch((error: Error) => {
    console.error("MongoDB connection failed", error);
    process.exit(1); // Encerra a aplicação caso o MongoDB não se conecte
  });

export default app;
