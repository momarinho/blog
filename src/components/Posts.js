import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

import AddPostModal from './AddPostModal';

const Posts = () => {
  const [posts, setPosts] = useState([]);
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

  const handleAdd = async (title, content) => {
    const docRef = await addDoc(collection(db, 'posts'), {
      title,
      content,
      createdAt: new Date(),
    });
    alert('New post added with ID: ', docRef.id);
    setShowAddModal(false);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  return (
    <main className="">
      <AddPostModal
        show={showAddModal}
        onClose={handleCloseModal}
        onAdd={handleAdd}
      />
      <div
        className="bg-white rounded-lg shadow-md p-8 flex flex-col"
        role="region"
        aria-label="Posts"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Posts</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Novo
          </button>
        </div>
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-8 flex flex-col mb-4"
          >
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <p className="flex-1 mb-4">{post.content.substring(0, 30)}...</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt.toDate()).toLocaleString()}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                type="button"
                aria-label={`Leia mais sobre ${post.title}`}
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
