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
    return <p>Loading...</p>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <article>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(post.createdAt.toDate()).toLocaleString()}
        </p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <button onClick={handleBack}>Back</button>
      </article>
    </>
  );
}

export default Post;
