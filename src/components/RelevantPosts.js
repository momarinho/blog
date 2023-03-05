import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RelevantPosts = ({ posts }) => {
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    const newSortedPosts = posts
      .slice()
      .sort((a, b) => {
        console.log(a.likes, b.likes);
        return b.likes - a.likes;
      })
      .slice(0, 6);

    console.log(newSortedPosts);
    setSortedPosts(newSortedPosts);
  }, [posts]);

  return (
    <div>
      <div className="flex">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">Popular Posts</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {sortedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col hover:bg-gray-200"
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
    </div>
  );
};

export default RelevantPosts;
