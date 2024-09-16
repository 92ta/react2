import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router DOMのuseNavigateフックをインポート

export const Threads = () => {
  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // navigateフックを取得

  useEffect(() => {
    const endpointURL = "https://railway.bulletinboard.techtrain.dev/threads?offset=0";

    const fetchThreads = async () => {
      try {
        const response = await fetch(endpointURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFetchData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []); // 依存配列を空にして、コンポーネントの初回レンダリング時にのみ実行

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleThreadClick = (threadId) => {
    navigate(`/threads/${threadId}`); // スレッドの詳細ページに遷移
  };

  return (
    <div className='new'>
      {fetchData.map((data) => (
        <div key={data.id} className="ApiResultShow">
          <button
            className='newthled'
            onClick={() => handleThreadClick(data.id)} // クリック時に詳細ページに遷移
          >
            {data.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Threads;
