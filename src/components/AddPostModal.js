import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { storage } from '../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const AddPostModal = ({ show, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);

  const handleAdd = (event) => {
    event.preventDefault();
    onAdd(title, content);
    setTitle('');
    setContent('');
  };

  const handleClose = () => {
    onClose();
  };

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert('Please upload an image first!');
      return;
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
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
      imageResize: {
        displaySize: true,
      },
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
          <h2 id="add-post-modal-title" className="text-2xl font-bold mb-4">
            New Post
          </h2>
          <form onSubmit={handleAdd}>
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
              className="mb-4"
            />

            <label className="block mb-2" htmlFor="file">
              Image
            </label>
            <div className="flex items-center mb-4">
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-4"
              >
                Upload
              </button>
              {file && (
                <span className="text-gray-500">
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </span>
              )}
            </div>
            {percent > 0 && percent < 100 && (
              <div className="w-full bg-gray-300 rounded-md mb-4">
                <div
                  className="bg-blue-600 h-full rounded-md"
                  style={{ width: `${percent}%` }}
                />
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-400 rounded-md mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddPostModal;
