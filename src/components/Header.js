import React, { useState, useRef, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';

import AddPostModal from './AddPostModal';

const Header = ({ onOpen }) => {
  const [user] = useAuthState(auth);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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

  const handleAdd = async (title, content) => {
    const docRef = await addDoc(collection(db, 'posts'), {
      title,
      content,
      uid: auth.currentUser.uid,
      createdAt: new Date(),
    });
    console.log('New post added with ID: ', docRef.id);
    setShowAddModal(false);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleOpenModal = () => {
    setShowAddModal(true);
    setShowMenu(false);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
  
    document.addEventListener('mousedown', handleDocumentClick);
  
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [menuRef]);
  

  return (
    <nav className="bg-gray-700 py-4 px-8 shadow-sm mb-8">
      {showAddModal && (
        <AddPostModal
          show={showAddModal}
          onClose={handleCloseModal}
          onAdd={handleAdd}
        />
      )}
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-gray-100">
          My Blog
        </Link>
        <button className="text-blue-500 hover:text-blue-600 focus:outline-none">
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
        {showAddModal ? (
          <button className="text-gray-100" onClick={handleCloseModal}>
            Close
          </button>
        ) : user ? (
          <div className="flex items-center">
            <img
              className="rounded-full ml-4 cursor-pointer w-10 h-10"
              src={user?.photoURL}
              alt={user?.displayName}
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div
                ref={menuRef}
                className="absolute right-10 top-8 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
              >
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white w-full text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white w-full text-left"
                  onClick={handleOpenModal}
                >
                  New Post
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
