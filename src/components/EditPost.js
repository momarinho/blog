import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import { ImageResize } from 'quill-image-resize-module';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize);

const EditPost = ({ post, onUpdatePost, setShowModal, show, onDelete }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleUpdatePost = (event) => {
    event.preventDefault();

    onUpdatePost({
      title,
      content,
    });
  };

  const handleDeletePost = (event) => {
    event.preventDefault();

    onDelete(post.id);
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
          <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={() => setShowModal(false)}
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
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full border border-gray-400 border-transparent"
            />
            <label
              htmlFor="content"
              className="block text-gray-700 font-bold mb-2"
            >
              Content
            </label>
            <ReactQuill
              id="content"
              value={content}
              onChange={handleContentChange}
              required
              modules={modules}
              formats={formats}
              className="mb-4"
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleUpdatePost}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleDeletePost}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  onUpdatePost: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EditPost;
