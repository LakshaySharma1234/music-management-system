import { useState, useEffect } from 'react'
import Header from './components/Header'
import MusicLibrary from './components/MusicLibrary'
import SpotifySearch from './components/SpotifySearch'
import Stats from './components/Stats'

function App() {
  const [view, setView] = useState('library') // 'library' or 'search'
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleSongAdded = () => {
    setRefreshTrigger(prev => prev + 1)
    setView('library')
  }

  return (
    <div className="app-container">
      <Header view={view} setView={setView} />
      
      {view === 'library' ? (
        <>
          <Stats refreshTrigger={refreshTrigger} />
          <MusicLibrary refreshTrigger={refreshTrigger} onUpdate={() => setRefreshTrigger(prev => prev + 1)} />
        </>
      ) : (
        <SpotifySearch onSongAdded={handleSongAdded} />
      )}
    </div>
  )
}

export default App



