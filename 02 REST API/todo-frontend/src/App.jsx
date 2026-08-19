//まずは一覧表示から

import { useState, useEffect } from "react";

function App() {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const handleAdd = async (e) => {
        e.preventDefault();
        // ① fetchでPOST
        // ② レスポンスをjson()でパース
        // ③ setTodosで配列に追加
        // ④ newTitleを空文字に戻す(入力欄をクリア)
        const res = await fetch(`/todos`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ title: newTitle }),
        });
        const data = await res.json();

        if (!res.ok) {
            console.error(data.error);
            return;
        }
        setTodos((prev) => [...prev, data]);
        setNewTitle("");
    }
    //put
    const handleToggle = async (todo) => {
        const res = await fetch(`/todos/${todo.id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ done: !todo.done }),
        });
        const data = await res.json();
        if (!res.ok) {
            console.error(data.error);
            return;
        }
        setTodos((prev) => {
            return prev.map((t) => (t.id === data.id ? data : t))
        });
    }

    //delete
    const handleDelete = async (todo) => {
        const res = await fetch(`/todos/${todo.id}`, {
            method: "DELETE",
        })
        const data = await res.json();
        if (!res.ok) {
            console.error(data.error);
            return;
        }
        setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    }

    // res.ok(ステータスコードが200番台かどうかを表すbooleanプロパティ)
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
                        <input 
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => handleToggle(todo)}/>
                        <p>{todo.title}</p>
                        <button onClick={() => {handleDelete(todo)}}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}
export default App;