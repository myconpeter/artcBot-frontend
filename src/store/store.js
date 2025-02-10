import { create } from 'zustand'
import axios from 'axios'

const useStore = create((set) => ({
  user: null, // Stores user data
  isAuthenticated: false, // Checks if the user is authenticated
  token: null, // Stores the Telegram authentication token

  // Fetch user data from the backend
  fetchUser: async (tgUser) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        telegramId: tgUser.id,
        username: tgUser.username,
      })

      set({
        user: data.user,
        isAuthenticated: true,
        token: data.token,
      })
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, token: null })
  },
}))

export default useStore
