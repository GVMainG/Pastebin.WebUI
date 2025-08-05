const PostList = ({ posts, onEdit, onDelete }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Постов пока нет</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-800 truncate">{post.title}</h3>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEdit(post)}
                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
                title="Редактировать"
              >
                ✎
              </button>
              <button
                onClick={() => onDelete(post.id)}
                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                title="Удалить"
              >
                🗑
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-2 line-clamp-3">
            {post.content}
          </p>
          
          <div className="text-xs text-gray-400">
            {post.createdAt}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList