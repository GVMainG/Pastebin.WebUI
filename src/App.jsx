import { useState } from 'react'
import PostList from './components/PostList'
import NewPostForm from './components/NewPostForm'
import UserProfileForm from './components/UserProfileForm'
import PostEditForm from './components/PostEditForm'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Первый пост', content: 'Содержимое первого поста', createdAt: '2024-01-15' },
    { id: 2, title: 'Второй пост', content: 'Содержимое второго поста', createdAt: '2024-01-16' }
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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Pastebin</h1>
          <button
            onClick={() => setShowUserProfile(!showUserProfile)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            👤 {user.nickname}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {showUserProfile && (
          <div className="mb-8">
            <UserProfileForm
              user={user}
              onSave={handleUpdateProfile}
              onCancel={() => setShowUserProfile(false)}
            />
          </div>
        )}

        {editingPost && (
          <div className="mb-8">
            <PostEditForm
              post={editingPost}
              onSave={handleSavePost}
              onCancel={() => setEditingPost(null)}
            />
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Создать новый пост</h2>
            <NewPostForm onSubmit={handleCreatePost} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Мои посты</h2>
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