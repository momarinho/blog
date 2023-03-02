import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditPost from './components/EditPost';

import './index.css';
import HomePage from './screens/HomePage';
import Post from './screens/Post';

function App() {
  return (
    <div className="min-h-screen min-w-full">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/posts/:id" element={<Post />} />
          <Route exact path="/posts/:id/edit" element={<EditPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
