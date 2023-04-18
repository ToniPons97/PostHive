import 'normalize.css';

import Navbar from "./components/Navbar/Navbar"
import Sidebar from './components/Sidebar/Sidebar';
import PostsContainer from './components/PostsContainer/PostsContainer';
import { store } from './state/Store';
import { fetchPosts } from './state/PostsState';
import { useState, useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // Fetching posts using fetchPosts thunk middleware.
    store.dispatch(fetchPosts('https://jsonplaceholder.typicode.com/posts'));
  }, []);

  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  
  const handlePinFilter = (ev: { target: { checked: boolean; }; }) => {
    setShowPinnedOnly(ev.target.checked);
  }

  const [ keyword, setKeyword ] = useState('');
  const handleKeywordSearch = (ev: {target: {value : string}}) => {    
    setKeyword(prev => ev.target.value);
  }

  return (
    <div className="App">
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar 
          onPinFilter={handlePinFilter} onKeywordSearch={handleKeywordSearch} />
        <PostsContainer keyword={keyword} showPinnedOnly={showPinnedOnly} />
      </div>
    </div>
  );
}

export default App;
