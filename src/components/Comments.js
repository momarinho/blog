import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedComments = [];
      snapshot.forEach((doc) => {
        updatedComments.push({ id: doc.id, ...doc.data() });
      });
      setComments(updatedComments);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">Comments</h2>
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="flex bg-gray-100 p-4 rounded-lg mb-4">
          <img
            src={comment.author?.photoURL}
            alt={comment.author?.displayName}
            className="rounded-full w-10 h-10 mr-4"
          />
          <div>
            <p className="text-lg font-semibold">{comment.content}</p>
            <p className="text-gray-500 text-sm mt-1">
              By {comment.author.displayName}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
