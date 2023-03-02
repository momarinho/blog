import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

import AddPostModal from './AddPostModal';
import RecentPosts from './RecentPosts';
import AllPosts from './AllPosts';
import { Link } from 'react-router-dom';

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
    console.log('New post added with ID: ', docRef.id);
    setShowAddModal(false);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleOpenModal = () => {
    setShowAddModal(true);
  };

  return (
    <main className="max-w-7xl mx-auto py-8 px-8">
      <AddPostModal
        show={showAddModal}
        onClose={handleCloseModal}
        onAdd={handleAdd}
      />

      {/* <Link
        to="/add-post"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Add Post
      </Link> */}

      <RecentPosts posts={posts} />

      <AllPosts posts={posts} onOpen={handleOpenModal} />
    </main>
  );
};

export default Posts;
