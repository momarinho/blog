import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

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

  const handleOpenModal = () => {
    setShowAddModal(true);
  };

  const sections = document.querySelectorAll('.section-container');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  });

  sections.forEach((section) => {
    observer.observe(section);
  });

  return (
    <main>
      <section className="section-container">
        <RecentPosts posts={posts} />
      </section>

      <section className="section-container bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RelevantPosts posts={posts} />
        </div>
      </section>

      <section className="section-container py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AllPosts posts={posts} onOpen={handleOpenModal} />
        </div>
      </section>
    </main>
  );
};

export default Posts;
