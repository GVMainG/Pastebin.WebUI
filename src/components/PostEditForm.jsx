import { useState } from 'react'

const PostEditForm = ({ post, onSave, onCancel }) => {
  const [content, setContent] = useState(post.content)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!content.trim()) {
      alert('Содержимое поста не может быть пустым')
      return
    }

    setIsSubmitting(true)

    try {
      await onSave(content.trim())
    } catch (error) {
      console.error('Ошибка сохранения поста:', error)
      alert('Ошибка при сохранении поста')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-3">✏️</span>
        Редактирование поста
      </h3>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-blue-800 font-medium">{post.title}</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label htmlFor="editContent" className="block text-base font-semibold text-gray-700 mb-3 flex items-center">
            <span className="mr-2">📝</span>
            Содержимое
          </label>
          <textarea
            id="editContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical transition-all duration-200 bg-white/50 hover:bg-white/70 text-base leading-relaxed"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isSubmitting ? '💾 Сохранение...' : '✅ Сохранить изменения'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            ❌ Отмена
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostEditForm