import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

import Header from '../components/Header';

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const postRef = doc(db, 'posts', id);
    const unsubscribe = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        setPost(doc.data());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [id]);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-xl font-medium">Loading...</p>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(post.createdAt.toDate()).toLocaleString()}
        </p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <button
          onClick={handleBack}
          className="mt-8 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back
        </button>
      </div>
    </>
  );
}

export default Post;
