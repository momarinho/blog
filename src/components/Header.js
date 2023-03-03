import React, { useState, useRef, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const Header = ({ onOpen }) => {
  const [user] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const searchInputRef = useRef(null);
  const menuRef = useRef(null);

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
    setShowMenu(false);
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

  const handleSearch = async () => {
    console.log(`Searching for "${searchTerm}"...`);
    //implement
    const querySnapshot = await db
      .collection('posts')
      .where('title', 'array-contains', searchTerm)
      .get();
    const results = querySnapshot.docs.map((doc) => doc.data());
    console.log(results);
  };

  return (
    <nav className="bg-gray-700 py-4 px-8 shadow-sm mb-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-gray-100">
          My Blog
        </Link>
        <div className="flex items-center">
          <div className="relative">
            <button
              className="text-blue-500 hover:text-blue-600 focus:outline-none"
              onClick={() => setShowSearch(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ionicon"
                viewBox="0 0 512 512"
                width="26"
                height="26"
              >
                <path
                  d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                  fill="none"
                  stroke="currentColor"
                  stroke-miterlimit="10"
                  stroke-width="32"
                ></path>
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="32"
                  d="M338.29 338.29L448 448"
                ></path>
              </svg>
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
                      d="M13.828 12.172a5 5 0 11-7.056-7.054 5 5 0 017.056 7.054zm1.4B8r3B4p7yhRXuBWLqsQ546WR43cqQwrbXMDFnBi6vSJBeif8tPW85a7r7DM961Jvk4hdryZoByEp8GC8HzsqJpRN4FxGM9828-5.657 7 7 0 015.657 2.828 7 7 0 010 9.9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {user ? (
            <div className="relative">
              <img
                className="h-8 w-8 rounded-full ml-4 cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
                src={user.photoURL}
                alt=""
                ref={menuRef}
              />
              {showMenu && (
                <div className="absolute top-0 right-0 z-10 bg-white border border-gray-400 rounded py-2 px-20">
                  <div className="flex flex-col">
                    <button
                      className="block w-full text-left py-2 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="text-green-500 hover:text-green-600 focus:outline-none ml-2"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
