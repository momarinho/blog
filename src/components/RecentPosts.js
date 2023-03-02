import { useState } from 'react';
import { Link } from 'react-router-dom';

const RecentPosts = ({ posts }) => {
  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
    .slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % sortedPosts.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (currentIndex - 1 + sortedPosts.length) % sortedPosts.length
    );
  };

  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row md:gap-4">
        {sortedPosts
          .slice(currentIndex, currentIndex + 3)
          .map((post, index) => (
            <div
              key={post.id}
              className={`bg-white rounded-lg shadow-md p-24 flex-1 mb-4 md:mb-0 hover:scale-105 ${
                index > 0 ? 'hidden' : ''
              }`}
            >
              <Link
                to={`/posts/${post.id}`}
                className="text-2xl font-bold mb-2"
              >
                {post.title}
              </Link>
              <div className="flex justify-between items-center ">
                {/* <p className="mb-4 flex-1">
                  {post.content.substring(0, 40).replace(/(<([^>]+)>)/gi, '')}
                  ...
                </p> */}

                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt.toDate()).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
                  onClick={goToPrevious}
                >
                  &lt;
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={goToNext}
                >
                  &gt;
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default RecentPosts;
