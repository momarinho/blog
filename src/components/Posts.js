import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

import AddPostModal from './AddPostModal';
import RecentPosts from './RecentPosts';
import AllPosts from './AllPosts';

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
    <main class="max-w-7xl mx-auto py-8 px-8 sm:px-16 md:px-24 min-w-[320px]">
      <AddPostModal
        show={showAddModal}
        onClose={handleCloseModal}
        onAdd={handleAdd}
      />

      <RecentPosts posts={posts} />

      <AllPosts posts={posts} onOpen={handleOpenModal} />
    </main>
  );
};

export default Posts;
