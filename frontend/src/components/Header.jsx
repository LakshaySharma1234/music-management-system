import { Music, Search, Library } from 'lucide-react'

function Header({ view, setView }) {
  return (
    <header className="header">
      <div className="header-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Music size={32} color="#667eea" />
          <h1>Music Management System</h1>
        </div>
        <div className="nav-buttons">
          <button
            className={`nav-btn ${view === 'library' ? '' : 'secondary'}`}
            onClick={() => setView('library')}
          >
            <Library size={18} />
            My Library
          </button>
          <button
            className={`nav-btn ${view === 'search' ? '' : 'secondary'}`}
            onClick={() => setView('search')}
          >
            <Search size={18} />
            Add from Spotify
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header



