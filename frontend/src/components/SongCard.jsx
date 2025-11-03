import { Star } from 'lucide-react'

function SongCard({ song, onClick }) {
  return (
    <div className="song-card" onClick={onClick}>
      <img
        src={song.image_url || 'https://via.placeholder.com/250'}
        alt={song.title}
        className="song-image"
      />
      <div className="song-info">
        <div className="song-title">{song.title}</div>
        <div className="song-artist">{song.artist}</div>
        <div className="song-meta">
          {song.genre && <span className="genre-tag">{song.genre}</span>}
          <div className="rating">
            <Star size={16} fill="#f59e0b" />
            {song.rating}/10
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongCard



