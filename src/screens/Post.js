import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from '../config/firebase';
import {
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

import Header from '../components/Header';
import EditPost from '../components/EditPost';

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    const postRef = doc(db, 'posts', id);
    const unsubscribe = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        const postData = doc.data();
        setPost(postData);
        setLikes(postData.likes);

        const currentUser = auth.currentUser;
        if (currentUser && postData.uid === currentUser.uid) {
          setIsCreator(true);
          console.log('is creator');
        }
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

  const handleDeleteClick = async () => {
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef);
    navigate('/', { replace: true });
  };

  const handleLikeClick = async () => {
    const currentUser = auth.currentUser;
    const postRef = doc(db, 'posts', id);

    // Check if the user has already liked the post
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();
    const likedBy = postData.likedBy || [];
    if (likedBy.includes(currentUser.uid)) {
      // User has already liked the post
      return;
    }

    // Update the like count and the list of users who liked the post
    const newLikes = postData.likes + 1;
    const newLikedBy = [...likedBy, currentUser.uid];
    setLikes(Number(newLikes));
    await updateDoc(postRef, { likes: newLikes, likedBy: newLikedBy });
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-40 py-10 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 flex row-auto justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {new Date(post.createdAt.toDate()).toLocaleString()}
            </p>
          </div>
          <div className="mt-6 flex items-center ">
            {isCreator && (
              <button
                type="button"
                className="inline-block bg-gray-700 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-4"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
            {console.log('is creator', isCreator)}
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
        <a href="mailto:mateusomarinho@gmail.com" className="m-2">
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
          className="m-2"
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
        onDelete={handleDeleteClick}
      />
    </div>
  );
}

export default Post;
