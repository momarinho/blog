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
import Loader from '../components/Loader';
import Comment from '../components/Comment';
import Comments from '../components/Comments';
import Footer from '../components/Footer';

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
    return <Loader />;
  }

  const handleDeleteClick = async () => {
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef);
    navigate('/', { replace: true });
  };

  const handleLikeClick = async () => {
    const currentUser = auth.currentUser;
    const postRef = doc(db, 'posts', id);

    // Check if the user is logged in
    if (!currentUser) {
      return;
    }

    // Check if the user has already liked the post
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();
    const likedBy = postData.likedBy || [];
    if (likedBy.includes(currentUser.uid)) {
      // User has already liked the post, so unlike it
      const newLikes =
        typeof postData.likes === 'number' ? postData.likes - 1 : 0;
      const newLikedBy = likedBy.filter((uid) => uid !== currentUser.uid);
      await updateDoc(postRef, { likes: newLikes, likedBy: newLikedBy });
      setLikes(newLikes);
    } else {
      // User hasn't liked the post yet, so like it
      const newLikes =
        typeof postData.likes === 'number' ? postData.likes + 1 : 1;
      const newLikedBy = [...likedBy, currentUser.uid];
      await updateDoc(postRef, { likes: newLikes, likedBy: newLikedBy });
      setLikes(newLikes);
    }
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <section>
          <div className="pb-5 mb-8 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
              <p className="mt-1 text-sm text-gray-500">
                {new Date(post.createdAt.toDate()).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between mt-4 sm:mt-0 sm:ml-4">
              {isCreator && (
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 mr-2"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}

              <button
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                onClick={handleBack}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 19L8 12L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            className="prose mt-6 mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>

        <hr />

        <section>
          <div className="mt-12">
            <Comment />
          </div>

          <div className="mt-8">
            <Comments />
          </div>
        </section>

        <section>
          <div className="flex justify-center items-center bottom-0 mx-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="m-2"
            >
              <img
                src="https://img.shields.io/badge/-Facebook-%23333?style=for-the-badge&logo=facebook&logoColor=white"
                alt=""
              />
            </a>
            <a
              href={`https://twitter.com/share?url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="m-2 py-2"
            >
              <img
                src="https://img.shields.io/badge/-Twitter-%23333?style=for-the-badge&logo=twitter&logoColor=white"
                alt=""
              />
            </a>

            <button
              className="m-2 px-6 py-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleLikeClick}
            >
              Likes {likes}
            </button>
          </div>
        </section>

        <EditPost
          post={post}
          onUpdatePost={handleUpdatePost}
          setShowModal={setShowModal}
          show={showModal}
          onDelete={handleDeleteClick}
        />
      </div>

      <Footer />
    </main>
  );
}

export default Post;
