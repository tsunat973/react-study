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

//GET /todos/:id 単体取得
app.get("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find((t) => t.id === id);

    if(!todo) {
        return res.status(404).json({ error: `id=${id} のtodo は見つかりません`})
    }

    res.json(todo);
})


//PUT /todos/:id ... 更新
app.put("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find((t) => t.id === id);

    if(!todo) {
        return res.status(404).json({ error: `id=${id} のtodoが見つかりません`});
    }

    const { title, done } = req.body;

    if(title !== undefined) {
        if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({error: "titleはから出ない文字列である必要があります"});
        }
        todo.title = title;
    }

    if (done !== undefined) {
        if (typeof done !== "boolean") {
            return res.status(400).json({error: "doneは真偽値である必要があります"});
        }
        todo.done = done;
    }

    res.json(todo);
});


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});