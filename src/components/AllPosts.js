import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const AllPosts = ({ posts, likes }) => {
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
      </div>
      <InfiniteScroll
        dataLength={visiblePosts.length}
        next={handleShowMore}
        hasMore={numPosts < sortedPosts.length}
        loader={
          <div class="flex justify-center items-center h-screen">
            <div class="relative inline-block">
              <div class="w-16 h-16 border-4 border-gray-300 rounded-full"></div>
              <div class="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-500 rounded-full border-t-0 animate-spin"></div>
            </div>
          </div>
        }
        endMessage={
          <p className="text-center mt-2 text-gray-300">
            No more posts to show
          </p>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {visiblePosts.map((post) => (
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
                <p>{likes}</p>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default AllPosts;
