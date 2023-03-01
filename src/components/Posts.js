import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, 'posts'), {
      title,
      content,
      createdAt: new Date(),
    });
    console.log('New post added with ID: ', docRef.id);
    setTitle('');
    setContent('');
  };

  return (
    <main className="max-w-7xl mx-auto py-8 px-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col">
        <h2 className="text-2xl font-bold mb-2">New Post</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="font-bold mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 mb-4"
            required
          />
          <label htmlFor="content" className="font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 mb-4 h-40"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Post
          </button>
        </form>
      </div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow-md p-8 flex flex-col"
        >
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="mb-4 flex-1">{post.content}</p>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt.toDate()).toLocaleString()}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Read more
            </button>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Posts;
