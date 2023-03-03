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
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, sortedPosts.length]);

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row md:gap-4">
        {sortedPosts.map((post, index) => (
          <div
            key={post.id}
            className={`bg-white rounded-lg shadow-md p-24 flex-1 mb-4 hover:scale-105 ${
              index === currentIndex ? '' : 'hidden'
            }`}
          >
            <Link to={`/posts/${post.id}`} className="text-xl font-bold mb-2">
              {post.title}
            </Link>
            <img src={post.thumbnailUrl} alt={post.title} className="mb-4" />
            <p className="text-sm text-gray-500">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt.toDate()).toLocaleString()}
              </p>
              <div className="flex">
                {sortedPosts.map((post, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full mx-1 ${
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
    </section>
  );
};

export default RecentPosts;
