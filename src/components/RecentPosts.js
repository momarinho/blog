import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecentPosts = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
    .slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % sortedPosts.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex, sortedPosts.length]);

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mb-8 flex justify-center items-center">
      <div className="flex flex-col md:flex-row md:gap-4 mx-auto">
        {sortedPosts.map((post, index) => (
          <div
            key={post.id}
            className={`bg-white rounded-lg shadow-md px-48 py-36 mb-4 hover:scale-105 hover:opacity-90 ${
              index === currentIndex ? '' : 'hidden'
            }`}
          >
            <Link to={`/posts/${post.id}`} className="text-xl font-bold mb-2">
              {post.title}
            </Link>

            <p className="text-sm text-gray-500">{post.excerpt}</p>
            <div className="flex flex-col justify-between h-full">
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt.toDate()).toLocaleString()}
              </p>
              <div className="flex-grow flex justify-content-between">
                {sortedPosts.map((post, index) => (
                  <button
                    key={index}
                    className={`h-3 w-3 rounded-full mx-1 ${
                      index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    onClick={() => goToIndex(index)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
