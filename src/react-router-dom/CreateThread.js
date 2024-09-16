import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateThread = () => {
  const { thread_id } = useParams(); // URLからスレッドIDを取得
  const [post, setPost] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpointURL = `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`;

    try {
      const response = await fetch(endpointURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post }), 
      });

      if (!response.ok) {
        throw new Error('ネットワーク応答に問題があります');
      }

      navigate(`/threads/${thread_id}`); // 投稿後にスレッド詳細ページに戻る
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>新しい投稿を作成 {thread_id}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          投稿内容:
          <input
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)} 
            required
          />
        </label>
        
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default CreateThread;
