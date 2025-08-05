const PostList = ({ posts, onEdit, onDelete }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-lg font-medium">Постов пока нет</p>
        <p className="text-sm mt-2">Создайте свой первый пост!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <div key={post.id} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:bg-white/80 transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-gray-800 text-lg leading-tight pr-4">{post.title}</h3>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(post)}
                className="text-blue-600 hover:text-blue-700 p-2 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                title="Редактировать"
              >
                <span className="text-lg">✏️</span>
              </button>
              <button
                onClick={() => onDelete(post.id)}
                className="text-red-500 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md"
                title="Удалить"
              >
                <span className="text-lg">🗑️</span>
              </button>
            </div>
          </div>
          
          <p className="text-gray-700 text-base mb-4 leading-relaxed line-clamp-3">
            {post.content}
          </p>
          
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">📅</span>
            <span>{new Date(post.createdAt).toLocaleDateString('ru-RU', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList