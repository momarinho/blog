import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

import Header from '../components/Header';
import EditPost from '../components/EditPost';

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleBack = () => {
    navigate(-1, { replace: true });
  };

  const handleUpdatePost = async (updatedPost) => {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, updatedPost);
    setShowModal(false);
  };

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-xl font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(post.createdAt.toDate()).toLocaleString()}
        </p>

        <button
          className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
        <button
          onClick={handleBack}
          className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Back
        </button>
        {!showModal ? (
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="relative pb-5 sm:pb-7">
                  <div className="relative px-4 sm:px-6">
                    <EditPost
                      post={post}
                      onUpdatePost={handleUpdatePost}
                      setShowModal={setShowModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Post;
