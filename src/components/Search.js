import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }
      const snapshot = await db
        .collection('posts')
        .where('title', '>=', searchQuery)
        .where('title', '<=', searchQuery + '\uf8ff')
        .get();
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSearchResults(results);
    };
    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold mb-4">Search Posts</h1>
        <Link
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          to="/"
        >
          Back
        </Link>
      </div>
      <form>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          placeholder="Search by post title"
        />
      </form>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((post) => (
            <li key={post.id}>
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default Search;
