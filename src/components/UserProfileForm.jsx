import { useState } from 'react'

const UserProfileForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    login: user.login,
    nickname: user.nickname,
    password: '',
    confirmPassword: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.login.trim() || !formData.nickname.trim()) {
      alert('Логин и никнейм обязательны для заполнения')
      return
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают')
      return
    }

    setIsSubmitting(true)

    try {
      const updatedUser = {
        login: formData.login.trim(),
        nickname: formData.nickname.trim(),
        ...(formData.password && { password: formData.password })
      }
      
      await onSave(updatedUser)
    } catch (error) {
      console.error('Ошибка обновления профиля:', error)
      alert('Ошибка при обновлении профиля')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-3">👤</span>
        Редактирование профиля
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="login" className="block text-base font-semibold text-gray-700 mb-3 flex items-center">
              <span className="mr-2">🔑</span>
              Логин
            </label>
            <input
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/70"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="nickname" className="block text-base font-semibold text-gray-700 mb-3 flex items-center">
              <span className="mr-2">✨</span>
              Никнейм
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/70"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-base font-semibold text-gray-700 mb-3 flex items-center">
              <span className="mr-2">🔒</span>
              Новый пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/70"
              placeholder="Оставьте пустым, если не хотите менять"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-base font-semibold text-gray-700 mb-3 flex items-center">
              <span className="mr-2">🔐</span>
              Подтвердите пароль
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/70"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isSubmitting ? '💾 Сохранение...' : '✅ Сохранить'}
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

export default UserProfileForm