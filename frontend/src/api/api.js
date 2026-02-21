import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL



const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Songs API
export const getSongs = async (genre = '') => {
  const params = genre ? { genre } : {}
  const response = await api.get('/songs', { params })
  return response.data
}

export const getSong = async (id) => {
  const response = await api.get(`/songs/${id}`)
  return response.data
}

export const createSong = async (songData) => {
  const response = await api.post('/songs', songData)
  return response.data
}

export const updateSong = async (id, songData) => {
  const response = await api.put(`/songs/${id}`, songData)
  return response.data
}

export const deleteSong = async (id) => {
  const response = await api.delete(`/songs/${id}`)
  return response.data
}

// Spotify API
export const searchSpotify = async (query, limit = 20) => {
  const response = await api.get('/spotify/search', {
    params: { q: query, limit },
  })
  return response.data
}

// Utility API
export const getGenres = async () => {
  const response = await api.get('/genres')
  return response.data
}

export const getStats = async () => {
  const response = await api.get('/stats')
  return response.data
}

export default api



