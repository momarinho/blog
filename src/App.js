import { useEffect, useState } from 'react';
import { auth, db } from './config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

import './index.css';
import Header from './components/Header';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const collectionRef = collection(db, 'posts');
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setPosts(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-8">
        <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
        {posts.map((post) => (
          <div key={post.id} className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="mb-4">{post.content}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt.toDate()).toLocaleString()}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
