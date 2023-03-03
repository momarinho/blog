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
  const [likes, setLikes] = useState(0);

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
      <div class="flex justify-center items-center h-screen">
        <div class="relative inline-block">
          <div class="w-16 h-16 border-4 border-gray-300 rounded-full"></div>
          <div class="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-500 rounded-full border-t-0 animate-spin"></div>
        </div>
      </div>
    );
  }

  const handleLikeClick = async () => {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, { likes: likes + 1 });
    setLikes(likes + 1);
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 flex row-auto justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {new Date(post.createdAt.toDate()).toLocaleString()}
            </p>
          </div>
          <div className="mt-6 flex items-center ">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </div>

        <div
          className="prose mt-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      <div className="flex justify-center">
        <a href="mailto:mateusomarinho@gmail.com" className='m-2'>
          <img
            src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white"
            target="_blank"
            alt=""
          />
        </a>
        <a
          href="https://www.linkedin.com/in/mateus-marinho-908a26229/"
          target="_blank"
          rel="noreferrer"
          className='m-2'
        >
          <img
            src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white"
            target="_blank"
            alt=""
          />
        </a>
        <div>
          <button className="m-2" onClick={handleLikeClick}>
            {likes} likes
          </button>
        </div>
      </div>

      <EditPost
        post={post}
        onUpdatePost={handleUpdatePost}
        setShowModal={setShowModal}
        show={showModal}
      />
    </div>
  );
}

export default Post;
