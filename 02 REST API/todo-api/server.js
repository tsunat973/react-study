import express from "express";

const app = express();
const PORT = 3000;
app.use(express.json());
let nextId = 3; //既存のidの次から始める

//仮のデータ
let todos = [
    {id: 1, title: "Expressの基本を復習する", done: false },
    {id: 2, title: "RESTの設計原則を確認する", done: false },
];

app.get("/", (req,res) => {
    res.json({ message: "Hello REST API" });
});

//GET /todos 一覧を返す
app.get("/todos", (req,res) => {
    res.json(todos);
});

//POST 新規作成
app.post("/todos", (req,res) => {
    //req.bodyはリクエストボディ
    const { title } = req.body;
    if(!title || typeof title !== "string") {
        return res.status(400).json({ error: "titleは必須の文字列です"});
    }

    const newTodo = { id: nextId++,title, done: false };
    todos.push(newTodo);

    res.status(201).json(newTodo);
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});