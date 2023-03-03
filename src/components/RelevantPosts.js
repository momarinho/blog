import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RelevantPosts = ({ posts }) => {
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    // Sort posts by the number of likes in descending order
    const sorted = posts
      .slice()
      .sort((a, b) => b.likes.length - a.likes.length);
    setSortedPosts(sorted).slice(0, 6);
  }, [posts]);

  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row md:gap-4">
        {sortedPosts.slice(0, 5).map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-24 flex-1 mb-4 hover:scale-105"
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
              <p className="text-sm text-gray-500">{post.likes.length} likes</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelevantPosts;
