import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const createThread = async ( title ) => {
  console.log("処理開始"); // 処理開始時にログ出力
  try {
    await axios.post("https://railway.bulletinboard.techtrain.dev/threads", {
      title: title,
    });
    console.log("処理成功"); // 処理成功時にログ出力
  } catch (error) {
    console.error("処理中にエラーが発生しました", error); // エラー発生時にログ出力
  }
};

const PostingThread = () => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
      // falseに戻す処理も加える、送信中などの処理を加える
      
      // createThreadはapiを呼び出すだけ
    await createThread(title)  

    setTitle("");
    navigate("/");

  };

  return (
    <div>
      <h2>スレッド新規作成</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="スレッドタイトル"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit" >
          {isSubmitting ? "送信中...": "送信"}
        </button>
      </form>
      <Link to="/">
        <p>
            Topに戻る
        </p>
      </Link>
    </div>
  );
};


export default PostingThread;