import { useState, useEffect } from 'react'
import { getStats } from '../api/api'
import { Music, Star, Folder } from 'lucide-react'

function Stats({ refreshTrigger }) {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [refreshTrigger])

  const fetchStats = async () => {
    try {
      const data = await getStats()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  if (!stats) return null

  return (
    <div className="stats-section">
      <h2>Library Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total_songs}</div>
          <div className="stat-label">
            <Music size={16} style={{ display: 'inline', marginRight: '5px' }} />
            Total Songs
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.average_rating?.toFixed(1) || 0}</div>
          <div className="stat-label">
            <Star size={16} style={{ display: 'inline', marginRight: '5px' }} />
            Average Rating
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.genres?.length || 0}</div>
          <div className="stat-label">
            <Folder size={16} style={{ display: 'inline', marginRight: '5px' }} />
            Genres
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats



