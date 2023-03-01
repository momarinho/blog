import { useState } from 'react';

function RecentPosts({ posts }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % posts.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((currentIndex - 1 + posts.length) % posts.length);
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
      <div className="flex flex-col md:flex-row md:gap-4">
        {posts.slice(currentIndex, currentIndex + 3).map((post, index) => (
          <div
            key={post.id}
            className={`bg-white rounded-lg shadow-md p-8 flex-1 mb-4 md:mb-0 ${
              index > 0 ? 'hidden' : ''
            }`}
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="mb-4 flex-1">{post.content.substring(0, 30)}...</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt.toDate()).toLocaleString()}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                type="button"
                aria-label={`Leia mais sobre ${post.title}`}
              >
                Leia mais
              </button>
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
}

export default RecentPosts;
