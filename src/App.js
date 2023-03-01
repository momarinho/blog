import './index.css';
import Header from './components/Header';
import Posts from './components/Posts';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Posts />
    </div>
  );
}

export default App;
