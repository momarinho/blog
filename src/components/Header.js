import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
  const [user] = useAuthState(auth);

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

  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl text-gray-800">My Blog</div>
        {user ? (
          <div className="flex items-center">
            <img
              src={user.photoURL}
              alt="user profile"
              className="h-8 w-8 rounded-full mr-2"
            />
            <div className="text-gray-500 mr-2">{user.displayName}</div>
            <button
              className="text-red-500 hover:text-red-600  font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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
