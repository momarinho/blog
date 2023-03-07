import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import About from './screens/About';
import Contact from './screens/Contact';
import HomePage from './screens/HomePage';
import Post from './screens/Post';
import SearchPage from './screens/SearchPage';

function App() {
  return (
    <div className="min-h-screen min-w-full">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route exact path="/posts/:id" element={<Post />} />

          <Route exact path="/search" element={<SearchPage />} />

          <Route exact path="/about" element={<About />} />

          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
