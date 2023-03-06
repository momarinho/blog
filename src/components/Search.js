import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate()

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

  const searchPosts = () => {
    const queryText = inputValue.trim().toLowerCase();
    if (queryText) {
      const filteredPosts = posts.filter((post) => {
        return post.title.toLowerCase().includes(queryText);
      });
      setPosts(filteredPosts);
    } else {
      const collectionRef = collection(db, 'posts');
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setPosts(data);
      });
      return () => unsubscribe();
    }
  };

  const handleSearch = () => {
    searchPosts();
  };

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <div className="m-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-400 rounded mr-2"
        />
        <button onClick={handleSearch}>Search posts</button>
      </div>
      <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
              onClick={handleBack}
            >
              Back
            </button>
      <ul>
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col hover:bg-gray-200 relative m-2"
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p
              className="mb-4 flex-1 prose"
              dangerouslySetInnerHTML={{
                __html: `${post.content.substring(0, 10)}...`,
              }}
            ></p>
            <img
              src={post.imageUrl}
              alt={post.title}
              className="absolute top-0 left-0 w-full h-full object-cover opacity-0 hover:opacity-100 rounded-lg"
              style={{ backgroundColor: 'gray' }}
            />

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt.toDate()).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Search;
