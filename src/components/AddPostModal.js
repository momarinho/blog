import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageResize } from 'quill-image-resize-module';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

Quill.register('modules/imageResize', ImageResize);

const AddPostModal = ({ show, onClose, setShowAddModal }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uid, setUid] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const storage = getStorage();

  const handleAddPost = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, 'posts'), {
      title,
      content,
      uid: auth.currentUser.uid,
      imageUrl,
      createdAt: new Date(),
    });
    console.log('New post added with ID: ', docRef.id);
    setShowAddModal(false);
    setTitle('');
    setContent('');
    setUid('');
    setImageUrl('');
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, 'images/' + file.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log('Image uploaded successfully');
        return getDownloadURL(storageRef);
      })
      .then((url) => {
        console.log('Image URL:', url);
        setImageUrl(url); // set imageUrl state variable
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const handleClose = () => {
    onClose();
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
  ];

  return (
    show && (
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-90 flex justify-center items-center"
        aria-hidden="true"
      >
        <div
          className="bg-white rounded-lg shadow-md p-8 w-5/6 h-screen overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-post-modal-title"
        >
          <div className="bg-gray-50 flex justify-between p-4 mb-4">
            <h2 id="add-post-modal-title" className="text-2xl font-bold">
              New Post
            </h2>
            <button
              onClick={handleAddPost}
              type="button"
              disabled={!title || !content}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add Post
            </button>
          </div>
          <form>
            <label className="block mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-400 p-2 rounded mb-4"
            />
            <label className="block mb-2" htmlFor="content">
              Content
            </label>
            <ReactQuill
              id="content"
              value={content}
              onChange={(value) => setContent(value)}
              required
              modules={modules}
              formats={formats}
              className="font-sans text-base mb-4"
            />
            <div className="">
              <label htmlFor="file">Cover Image</label>
              <input
                type="file"
                className=""
                onChange={handleUpload}
                accept="image/png, image/jpeg"
                required
              />
            </div>

            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={handleClose}
                type="button"
                className="text-gray-100 hover:text-gray-200 bg-red-600 hover:bg-red-700 transition ease-in-out duration-150 rounded-full"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-8 w-8"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </form>
          <footer className="text-gray-500">
            <p>The card sizes are h:320px/w:520px</p>
          </footer>
        </div>
      </div>
    )
  );
};
export default AddPostModal;
