const AllPosts = ({ posts, onOpen }) => {
  const sortedPosts = posts.slice().sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">All Posts</h2>
        <button
          onClick={onOpen}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Novo
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-8 flex flex-col"
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllPosts;
