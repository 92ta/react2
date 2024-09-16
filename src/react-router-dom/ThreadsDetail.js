import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ThreadDetail = () => {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=0`);
        if (!response.ok) {
          throw new Error('ネットワーク応答に問題があります');
        }
        const data = await response.json();
        setPosts(data.posts || []); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [thread_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>スレッド {thread_id} の投稿</h1>
      <Link to={`/create-thread/${thread_id}`} className="create-button">
        <button>投稿を作成</button>
      </Link>
      {/* 条件付きレンダリング */}
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <p>{post.post}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>投稿はありません。</p>
      )}
    </div>
  );
};

export default ThreadDetail;
