import { useState } from 'react'

const NewPostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      alert('Заполните все поля')
      return
    }

    setIsSubmitting(true)
    
    try {
      await onSubmit({ title: title.trim(), content: content.trim() })
      setTitle('')
      setContent('')
    } catch (error) {
      console.error('Ошибка создания поста:', error)
      alert('Ошибка при создании поста')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
      <div className="mb-6">
        <label htmlFor="title" className="block text-base font-semibold text-gray-700 mb-3 flex items-center">
          <span className="mr-2">📝</span>
          Заголовок
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/70 text-lg"
          placeholder="Введите заголовок поста"
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-8">
        <label htmlFor="content" className="block text-base font-semibold text-gray-700 mb-3 flex items-center">
          <span className="mr-2">📄</span>
          Содержимое
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical transition-all duration-200 bg-white/50 hover:bg-white/70 text-base leading-relaxed"
          placeholder="Введите содержимое поста"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {isSubmitting ? '✨ Создание...' : '🚀 Создать пост'}
      </button>
    </form>
  )
}

export default NewPostForm