import './App.css';
import React from 'react';
import PostingThread from './react-router-dom/PostingThread';
import { Threads } from "./react-router-dom/Threads";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Top from "./react-router-dom/Top"
import { NotFound } from "./react-router-dom/NotFound";
import ThreadsDetail from './react-router-dom/ThreadsDetail'; // スレッド詳細コンポーネント
import CreateThread from './react-router-dom/CreateThread'; // 投稿作成コンポーネント


function App() {

    
    
    return (

              <BrowserRouter>
      <div>
        <header>
            <h1>
              掲示板
            </h1>
            <Link to="/threads/new">
            <p>
              掲示板を立てる
            </p>
            </Link>
        </header>
      </div>
              <Routes>
                <Route path='/' element={<Top />} />
                <Route path="/threads/new" element={<PostingThread />} />
                <Route path="/*" element={<NotFound />} />
                <Route path='/Threads' element={<Threads />} />
                <Route path="/threads/:thread_id" element={<ThreadsDetail />} /> {/* スレッド詳細ページ */}
                <Route path="/create-thread/:thread_id" element={<CreateThread />} /> {/* 投稿作成ページ */}
              </Routes>
            </BrowserRouter>

    );
  }

export default App;
