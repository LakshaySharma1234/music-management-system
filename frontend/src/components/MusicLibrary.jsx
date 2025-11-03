import { useState, useEffect } from 'react'
import { getSongs, getGenres } from '../api/api'
import SongCard from './SongCard'
import SongModal from './SongModal'
import { Filter } from 'lucide-react'

function MusicLibrary({ refreshTrigger, onUpdate }) {
  const [songs, setSongs] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedSong, setSelectedSong] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGenres()
    fetchSongs()
  }, [refreshTrigger, selectedGenre])

  const fetchSongs = async () => {
    setLoading(true)
    try {
      const data = await getSongs(selectedGenre)
      setSongs(data || [])
    } catch (error) {
      console.error('Error fetching songs:', error)
      setSongs([])
    } finally {
      setLoading(false)
    }
  }

  const fetchGenres = async () => {
    try {
      const data = await getGenres()
      setGenres(data || [])
    } catch (error) {
      console.error('Error fetching genres:', error)
    }
  }

  const handleSongClick = (song) => {
    setSelectedSong(song)
  }

  const handleCloseModal = () => {
    setSelectedSong(null)
  }

  const handleSongUpdated = () => {
    fetchSongs()
    fetchGenres()
    setSelectedSong(null)
    onUpdate()
  }

  if (loading) {
    return <div className="loading">Loading your music library...</div>
  }

  return (
    <div className="search-section">
      <div className="search-header">
        <h2>My Music Collection</h2>
      </div>

      {genres.length > 0 && (
        <div className="filter-section">
          <button
            className={`filter-btn ${selectedGenre === '' ? 'active' : ''}`}
            onClick={() => setSelectedGenre('')}
          >
            <Filter size={14} style={{ display: 'inline', marginRight: '5px' }} />
            All Genres
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              className={`filter-btn ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

      {songs.length === 0 ? (
        <div className="empty-state">
          <h3>No songs in your library yet</h3>
          <p>Start by adding songs from Spotify!</p>
        </div>
      ) : (
        <div className="songs-grid">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onClick={() => handleSongClick(song)}
            />
          ))}
        </div>
      )}

      {selectedSong && (
        <SongModal
          song={selectedSong}
          onClose={handleCloseModal}
          onUpdate={handleSongUpdated}
        />
      )}
    </div>
  )
}

export default MusicLibrary



