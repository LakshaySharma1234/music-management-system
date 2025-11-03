import { useState } from 'react'
import { updateSong, deleteSong } from '../api/api'
import { X, Save, Trash2 } from 'lucide-react'

function SongModal({ song, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    rating: song.rating || 0,
    summary: song.summary || '',
    genre: song.genre || '',
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateSong(song.id, formData)
      onUpdate()
    } catch (error) {
      console.error('Error updating song:', error)
      alert('Failed to update song')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        await deleteSong(song.id)
        onUpdate()
      } catch (error) {
        console.error('Error deleting song:', error)
        alert('Failed to delete song')
      }
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Song</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          <img
            src={song.image_url || 'https://via.placeholder.com/300'}
            alt={song.title}
            className="modal-image"
          />

          <div style={{ marginBottom: '20px' }}>
            <h3>{song.title}</h3>
            <p style={{ color: '#666' }}>{song.artist}</p>
            <p style={{ color: '#999', fontSize: '0.9rem' }}>{song.album}</p>
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              className="form-input"
              value={formData.genre}
              onChange={handleChange}
              placeholder="e.g., Pop, Rock, Jazz"
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
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <Trash2 size={18} />
              Delete
            </button>
            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongModal



