import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
const PORT = 8080;
const prisma = new PrismaClient();

app.get("/allTodos", async (req: Request, res: Response) => {
  try {
    const todoList = await prisma.todo.findMany();
    return res.json(todoList);
  } catch (error) {
    console.error("データベースエラー:", error);
    return res.status(500).json({ error: "データベースエラーが発生しました" });
  }
});

// ローカルサーバー立ち上げ
app
  .listen(PORT, () => {
    console.log("サーバーが立ち上がりました！");
    console.log(`http://localhost:${PORT} でアクセスできます`);
  })
  .on("error", (error) => {
    console.error("サーバー起動エラー:", error);
  });
