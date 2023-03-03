import React, { useState, useRef, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const Header = () => {
  const [user] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearch = () => {
    console.log(`Searching for "${searchTerm}"...`);
    //implement 
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(() => {
        console.log('Signed in with Google successfully');
      })
      .catch((error) => {
        console.error('Error signing in with Google', error);
      });
  };

  const handleLogout = async () => {
    await auth.signOut();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchInputRef]);

  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-gray-800">
          My Blog
        </Link>
        <div className="flex items-center">
          <div className="relative">
            <button
              className="text-blue-500 hover:text-blue-600 focus:outline-none"
              onClick={() => setShowSearch(true)}
            >
              Search
            </button>
            {showSearch && (
              <div className="absolute top-0 right-0 z-10 bg-white border border-gray-400 rounded w-96">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full border-none py-2 px-4"
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="absolute top-0 right-0 px-4 py-2"
                  onClick={handleSearch}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="#000"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.4B8r3B4p7yhRXuBWLqsQ546WR43cqQwrbXMDFnBi6vSJBeif8tPW85a7r7DM961Jvk4hdryZoByEp8GC8HzsqJpRN4FxGM906-1.06l.059-.06a5.482 5.482 0 00-1.844-9.972 5.5 5.5 0 107.783 7.783zM10.5 13a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {user ? (
            <>
              <button
                className="text-red-500 hover:text-red-600 ml-2"
                onClick={handleLogout}
              >
                Logout
              </button>
              <img
                src={user.photoURL}
                alt="user profile"
                className="h-8 w-8 rounded-full mr-2 ml-2"
              />
            </>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleLogin}
            >
              Login with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
