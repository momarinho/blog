import { useState } from 'react';
import { Link } from 'react-router-dom';

const AllPosts = ({ posts, onOpen }) => {
  const [numPosts, setNumPosts] = useState(6);

  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());

  const visiblePosts = sortedPosts.slice(0, numPosts);

  const handleShowMore = () => {
    setNumPosts(numPosts + 6);
  };

  return (
    <section>
      <div className="flex justify-between m-12">
        <h2 className="text-2xl font-bold mb-4">All Posts</h2>
        <button
          onClick={onOpen}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          New Post
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {visiblePosts.map((post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p
              className="mb-4 flex-1 prose"
              dangerouslySetInnerHTML={{
                __html: `${post.content.substring(0, 50)}...`,
              }}
            ></p>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt.toDate()).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {numPosts < sortedPosts.length && (
        <div className='flex justify-center mt-8'>
          <button  onClick={handleShowMore}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">Show more</button>
        </div>
      )}
    </section>
  );
};

export default AllPosts;
