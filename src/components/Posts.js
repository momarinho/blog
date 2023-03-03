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
    <main>
      <AddPostModal
        show={showAddModal}
        onClose={handleCloseModal}
        onAdd={handleAdd}
      />

      <div className="mx-auto sm:px-16 md:px-24">
        <RecentPosts posts={posts} />
      </div>

      <div></div>

      <div className="bg-gray-50">
        <AllPosts posts={posts} onOpen={handleOpenModal} />
      </div>
    </main>
  );
};

export default Posts;
