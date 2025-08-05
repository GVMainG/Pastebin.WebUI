import { useState } from 'react'
import PostList from './components/PostList'
import NewPostForm from './components/NewPostForm'
import UserProfileForm from './components/UserProfileForm'
import PostEditForm from './components/PostEditForm'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Добро пожаловать в Pastebin', content: 'Это ваш первый пост! Здесь вы можете создавать и делиться текстовыми заметками. Редактируйте этот пост или создайте новый.', createdAt: '2024-01-15' },
    { id: 2, title: 'Советы по использованию', content: 'Используйте кнопку редактирования для изменения постов. Кнопка удаления поможет очистить ненужные записи. В профиле можно изменить свои данные.', createdAt: '2024-01-16' }
  ])
  
  const [editingPost, setEditingPost] = useState(null)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [user, setUser] = useState({
    login: 'user123',
    nickname: 'Пользователь',
    password: ''
  })

  const handleCreatePost = (newPost) => {
    // TODO: вставить вызов API
    const post = {
      id: Date.now(),
      ...newPost,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setPosts([post, ...posts])
  }

  const handleEditPost = (post) => {
    setEditingPost(post)
  }

  const handleSavePost = (updatedContent) => {
    // TODO: вставить вызов API
    setPosts(posts.map(post => 
      post.id === editingPost.id 
        ? { ...post, content: updatedContent }
        : post
    ))
    setEditingPost(null)
  }

  const handleDeletePost = (postId) => {
    // TODO: вставить вызов API
    setPosts(posts.filter(post => post.id !== postId))
  }

  const handleUpdateProfile = (updatedUser) => {
    // TODO: вставить вызов API
    setUser(updatedUser)
    setShowUserProfile(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">📝</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pastebin
            </h1>
          </div>
          <button
            onClick={() => setShowUserProfile(!showUserProfile)}
            className="flex items-center space-x-2 px-5 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md"
          >
            <span className="text-lg">👤</span>
            <span className="font-medium">{user.nickname}</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {showUserProfile && (
          <div className="mb-10 animate-in slide-in-from-top duration-300">
            <UserProfileForm
              user={user}
              onSave={handleUpdateProfile}
              onCancel={() => setShowUserProfile(false)}
            />
          </div>
        )}

        {editingPost && (
          <div className="mb-10 animate-in slide-in-from-top duration-300">
            <PostEditForm
              post={editingPost}
              onSave={handleSavePost}
              onCancel={() => setEditingPost(null)}
            />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><span className="mr-3">✨</span>Создать новый пост</h2>
            <NewPostForm onSubmit={handleCreatePost} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><span className="mr-3">📚</span>Мои посты</h2>
            <PostList
              posts={posts}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App