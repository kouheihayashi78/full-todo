import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
console.log("Expressアプリを作成しました");

const PORT = 8080;

app.get("/allTodos", (req: Request, res:Response) => {
    return res.send("API通信テスト")
})

// ローカルサーバー立ち上げ
app
  .listen(PORT, () => {
    console.log("サーバーが立ち上がりました！");
    console.log(`http://localhost:${PORT} でアクセスできます`);
  })
  .on("error", (error) => {
    console.error("サーバー起動エラー:", error);
  });
