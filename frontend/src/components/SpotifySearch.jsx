import { useState } from 'react'
import { searchSpotify, createSong } from '../api/api'
import { Search, Plus, X } from 'lucide-react'

function SpotifySearch({ onSongAdded }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSong, setSelectedSong] = useState(null)
  const [formData, setFormData] = useState({
    genre: '',
    rating: 5,
    summary: '',
  })

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const data = await searchSpotify(query)
      setResults(data || [])
    } catch (error) {
      console.error('Error searching Spotify:', error)
      alert('Failed to search Spotify. Make sure the backend is running and Spotify credentials are set.')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectSong = (song) => {
    setSelectedSong(song)
    setFormData({
      genre: '',
      rating: 5,
      summary: '',
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }))
  }

  const handleAddSong = async () => {
    if (!formData.genre.trim()) {
      alert('Please enter a genre')
      return
    }

    try {
      const songData = {
        spotify_id: selectedSong.id,
        title: selectedSong.title,
        artist: selectedSong.artist,
        album: selectedSong.album,
        genre: formData.genre,
        image_url: selectedSong.image_url,
        preview_url: selectedSong.preview_url,
        release_date: selectedSong.release_date,
        duration: selectedSong.duration,
        rating: formData.rating,
        summary: formData.summary,
      }

      await createSong(songData)
      alert('Song added successfully!')
      setSelectedSong(null)
      setQuery('')
      setResults([])
      onSongAdded()
    } catch (error) {
      console.error('Error adding song:', error)
      alert('Failed to add song. It might already exist in your library.')
    }
  }

  return (
    <div className="search-section">
      <div className="search-header">
        <h2>Search Spotify</h2>
      </div>

      <form onSubmit={handleSearch} className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search for songs, artists, or albums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          <Search size={20} />
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {results.length > 0 && (
        <div className="songs-grid">
          {results.map((song) => (
            <div key={song.id} className="song-card" onClick={() => handleSelectSong(song)}>
              <img
                src={song.image_url || 'https://via.placeholder.com/250'}
                alt={song.title}
                className="song-image"
              />
              <div className="song-info">
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
                <div className="song-artist" style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                  {song.album}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSong && (
        <div className="modal-overlay" onClick={() => setSelectedSong(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add to Library</h2>
              <button className="icon-btn" onClick={() => setSelectedSong(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-content">
              <img
                src={selectedSong.image_url || 'https://via.placeholder.com/300'}
                alt={selectedSong.title}
                className="modal-image"
              />

              <div style={{ marginBottom: '20px' }}>
                <h3>{selectedSong.title}</h3>
                <p style={{ color: '#666' }}>{selectedSong.artist}</p>
                <p style={{ color: '#999', fontSize: '0.9rem' }}>{selectedSong.album}</p>
              </div>

              <div className="form-group">
                <label htmlFor="genre">Genre *</label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  className="form-input"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="e.g., Pop, Rock, Jazz"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating: {formData.rating}/10</label>
                <div className="rating-input">
                  <input
                    type="range"
                    id="rating"
                    name="rating"
                    min="0"
                    max="10"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                  <span className="rating-display">{formData.rating}/10</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="summary">Why do you like this song?</label>
                <textarea
                  id="summary"
                  name="summary"
                  className="form-textarea"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Write your thoughts about this song..."
                />
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedSong(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleAddSong}
                >
                  <Plus size={18} />
                  Add to Library
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpotifySearch

