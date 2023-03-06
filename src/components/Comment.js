import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../config/firebase';

function Comment() {
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentUser = auth.currentUser;

    if (!currentUser) {
      return;
    }

    const commentData = await addDoc(collection(db, 'comments'), {
      content: comment,
      author: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      createdAt: new Date(),
    });
    console.log('New post added with ID: ', commentData.id);
    setComment('');
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
      <textarea
        value={comment}
        onChange={handleChange}
        placeholder="Write a comment..."
        className="border border-gray-300 rounded-lg p-2 w-full"
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
}

export default Comment;
