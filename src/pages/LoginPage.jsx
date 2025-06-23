import React, { useContext, useState } from 'react'
import AuthContext from '../context/auth/AuthContext'

export default function LoginPage() {
  const { loginToAccount, loading } = useContext(AuthContext)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await loginToAccount(credentials)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleOnChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-base font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={credentials.username}
            onChange={handleOnChange}
            required
            autoComplete="username"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-base font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleOnChange}
            required
            autoComplete="current-password"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-base text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}
