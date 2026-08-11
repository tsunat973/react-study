import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/user/userSlice";

function App() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error} = useSelector((state) => state.user);

  const handleSearch = () => {
    dispatch(fetchUser(username));
  };
  return (
    <div>
      <h1>GitHub User Search</h1>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ユーザー名を入力"/>
      <button onClick={handleSearch}>検索</button>

      {loading && <p>読み込み中...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div>
          <h2>{data.name || data.login}</h2>
          <p>{data.bio}</p>
          <p>フォロワー: {data.followers}</p>
        </div>
      )}
    </div>
  );
}

export default App;