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
    setTitle('');
    setContent('');
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
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        aria-hidden="true"
      >
        <div
          className="bg-white rounded-lg shadow-md p-8 w-5/6"
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
              className="mb-4 h-80 overflow-y-auto"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddPostModal;
