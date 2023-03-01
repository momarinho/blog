import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

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

  const handleAdd = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, 'posts'), {
      title,
      content,
      createdAt: new Date(),
    });
    alert('New post added with ID: ', docRef.id);
    setTitle('');
    setContent('');
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  return (
    <main className="max-w-7xl mx-auto py-8 px-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-2">Novo Post</h2>
            <form onSubmit={handleAdd}>
              <label htmlFor="title" className="font-bold mb-2">
                Título
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
                Conteúdo
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="border border-gray-400 rounded-lg px-4 py-2 mb-4 h-40"
                required
              ></textarea>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Adicionar
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col">
        <h2 className="text-2xl font-bold mb-2">Posts</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Novo
        </button>
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-8 flex flex-col m-2"
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="mb-4 flex-1">{post.content.substring(0, 30)}...</p>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt.toDate()).toLocaleString()}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Leia mais
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Posts;
