import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddPostModal = ({ show, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = (event) => {
    event.preventDefault();
    onAdd(title, content);
    setTitle('');
    setContent('');
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

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Add Post
              </button>
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
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default AddPostModal;
