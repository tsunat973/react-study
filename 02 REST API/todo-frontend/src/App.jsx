//まずは一覧表示から

import { useState, useEffect } from "react";

function App() {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const handleAdd = (e) => {
        e.preventDefault();
        // ① fetchでPOST
        // ② レスポンスをjson()でパース
        // ③ setTodosで配列に追加
        // ④ newTitleを空文字に戻す(入力欄をクリア)
        fetch(`/todos`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ title: newTitle }),
        })
            .then((res) => res.json())
            .then((data) => setTodos((prev) => [...prev, data]));
        setNewTitle("");
    }

useEffect(() => {
    const fetchTodos = async () => {
        fetch('/todos')
            .then(res => res.json())
            .then(data => setTodos(data));
    }
    fetchTodos();
}, []);

return (
    <div>
        <h1>Todo</h1>
        <form onSubmit={handleAdd}>
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <button type="submit">追加</button>
        </form>
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                    <p>{todo.title}</p>
                </li>
            ))}
        </ul>
    </div>
);

}
export default App;