import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
const PORT = 8080;
const prisma = new PrismaClient();

// ミドルウェアの追加
// データをjsonデータとして解析、req.bodyに格納
app.use(express.json());

// 全件取得api
app.get("/allTodos", async (req: Request, res: Response) => {
  try {
    const todoList = await prisma.todo.findMany();
    return res.json(todoList);
  } catch (error) {
    console.error("データベースエラー:", error);
    return res.status(500).json({ error: "データベースエラーが発生しました" });
  }
});

// todo登録api
app.post("/createTodo", async (req: Request, res: Response) => {
  try {
    const { title, isCompleted } = req.body;
    const createTodo = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      }
    });
    return res.status(201).json(createTodo);
  } catch (error) {
    console.error("データベースエラー:", error);
    return res.status(500).json({ error: "データベースエラーが発生しました"+ error });
  }
});

// todo編集api
app.put("/updateTodo/:id", async (req: Request, res: Response) => {
  try {
    // urlの:idにparams以降の名前を合わせる
    const id  = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const updateTodo = await prisma.todo.update({
      where: {
        id
      },
      data: {
        title,
        isCompleted,
      }
    });
    return res.status(200).json(updateTodo);
  } catch (error) {
    console.error("データベースエラー:", error);
    return res.status(500).json({ error: "データベースエラーが発生しました" + error });
  }
});

// todo削除api
app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  try {
    const id  = Number(req.params.id);
    const deleteTodo = await prisma.todo.delete({
      where: {
        id
      }
    });
    return res.status(200).json(deleteTodo);
  } catch (error) {
    console.error("データベースエラー:", error);
    return res.status(500).json({ error: "データベースエラーが発生しました" + error });
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
