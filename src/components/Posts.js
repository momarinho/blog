import { useEffect, useState } from 'react';
import { db, auth } from '../config/firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

import AddPostModal from './AddPostModal';
import RecentPosts from './RecentPosts';
import AllPosts from './AllPosts';
import RelevantPosts from './RelevantPosts';

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
      uid: auth.currentUser.uid,
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

      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RelevantPosts posts={posts} />
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AllPosts posts={posts} onOpen={handleOpenModal} />
        </div>
      </div>
    </main>
  );
};

export default Posts;
