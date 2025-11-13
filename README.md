# Music Management System

A full-stack music management application that allows you to import songs from Spotify, organize them by genre, rate them, and write reviews. Built with Go (backend) and React (frontend).

![Music Management System](https://img.shields.io/badge/Go-1.21-blue) ![React](https://img.shields.io/badge/React-18.2-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

✨ **Spotify Integration**: Search and import songs directly from Spotify
🎵 **Music Library**: Organize your favorite songs in one place
⭐ **Rating System**: Rate songs from 0-10
📝 **Personal Reviews**: Write summaries about why you like each song
🎨 **Genre Organization**: Categorize songs by genre and filter them
📊 **Statistics Dashboard**: View your music collection statistics
🎨 **Modern UI**: Beautiful, responsive design with gradient themes

## Tech Stack

### Backend
- **Go 1.21+**: Main programming language
- **Gin**: HTTP web framework
- **GORM**: ORM for database operations
- **SQLite**: Lightweight database
- **Spotify Web API**: Music data integration

### Frontend
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Axios**: HTTP client
- **Lucide React**: Icon library
- **CSS3**: Modern styling with gradients and animations

## Project Structure

```
music management system/
├── backend/
│   ├── main.go                 # Entry point
│   ├── go.mod                  # Go dependencies
│   ├── models/
│   │   └── song.go            # Data models
│   ├── database/
│   │   └── database.go        # Database setup
│   ├── services/
│   │   └── spotify.go         # Spotify API integration
│   └── handlers/
│       └── songs.go           # API handlers
├── frontend/
│   ├── package.json           # Node dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── index.html             # Entry HTML
│   └── src/
│       ├── main.jsx           # React entry point
│       ├── App.jsx            # Main app component
│       ├── index.css          # Global styles
│       ├── api/
│       │   └── api.js         # API client
│       └── components/
│           ├── Header.jsx     # Navigation header
│           ├── Stats.jsx      # Statistics display
│           ├── MusicLibrary.jsx   # Library view
│           ├── SongCard.jsx       # Song card component
│           ├── SongModal.jsx      # Edit/view modal
│           └── SpotifySearch.jsx  # Spotify search
└── README.md
```

## Prerequisites

Before running this project, make sure you have:

- **Go 1.21 or higher** installed ([Download](https://golang.org/dl/))
- **Node.js 18 or higher** and npm installed ([Download](https://nodejs.org/))
- **Spotify Developer Account** (for API credentials)

## Setup Instructions

### 1. Get Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in the app name and description
5. Once created, you'll see your **Client ID** and **Client Secret**

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create .env file from example
cp .env.example .env

# Edit .env and add your Spotify credentials
# .env should contain:
# PORT=8080
# SPOTIFY_CLIENT_ID=your_actual_client_id
# SPOTIFY_CLIENT_SECRET=your_actual_client_secret
# SPOTIFY_REDIRECT_URI=http://127.0.0.1:8080/callback
# DATABASE_PATH=./music.db

# Install Go dependencies
go mod download

# Run the backend server
go run main.go
```

The backend server will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (open a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## Usage Guide

### Adding Songs from Spotify

1. Click the **"Add from Spotify"** button in the navigation
2. Search for a song, artist, or album
3. Click on a song from the search results
4. Fill in the details:
   - **Genre**: Enter the genre (e.g., Pop, Rock, Jazz)
   - **Rating**: Use the slider to rate from 0-10
   - **Summary**: Write why you like this song
5. Click **"Add to Library"**

### Managing Your Library

1. Click **"My Library"** to view all your songs
2. Use **genre filters** at the top to filter by genre
3. Click on any song card to:
   - Edit the rating
   - Update the genre
   - Modify your review
   - Delete the song

### Viewing Statistics

The statistics section shows:
- **Total Songs**: Number of songs in your library
- **Average Rating**: Your average rating across all songs
- **Genres**: Number of different genres

## API Endpoints

### Songs
- `GET /api/songs` - Get all songs (optional: `?genre=Pop`)
- `GET /api/songs/:id` - Get a specific song
- `POST /api/songs` - Create a new song
- `PUT /api/songs/:id` - Update a song
- `DELETE /api/songs/:id` - Delete a song

### Spotify
- `GET /api/spotify/search?q=query&limit=20` - Search Spotify

### Utilities
- `GET /api/genres` - Get all unique genres
- `GET /api/stats` - Get library statistics
- `GET /health` - Health check

## Database Schema

### Song Model

```go
type Song struct {
    ID          uint      // Primary key
    SpotifyID   string    // Unique Spotify track ID
    Title       string    // Song title
    Artist      string    // Artist name
    Album       string    // Album name
    Genre       string    // User-defined genre
    ImageURL    string    // Album art URL
    PreviewURL  string    // Preview audio URL
    Rating      int       // Rating (0-10)
    Summary     string    // User review
    ReleaseDate string    // Release date
    Duration    int       // Duration in milliseconds
    CreatedAt   time.Time // Created timestamp
    UpdatedAt   time.Time // Updated timestamp
}
```

## Development

### Backend Development

```bash
cd backend
go run main.go
```

### Frontend Development

```bash
cd frontend
npm run dev
```

### Building for Production

**Backend:**
```bash
cd backend
go build -o music-management-server
./music-management-server
```

**Frontend:**
```bash
cd frontend
npm run build
# Output will be in the 'dist' folder
npm run preview  # Preview production build
```

## Troubleshooting

### Backend Issues

**Issue**: "Spotify client not initialized"
- **Solution**: Make sure you've set `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` in your `.env` file

**Issue**: "Failed to connect to database"
- **Solution**: Check that the `DATABASE_PATH` in `.env` points to a writable location

### Frontend Issues

**Issue**: "Failed to search Spotify"
- **Solution**: Ensure the backend is running on port 8080 and Spotify credentials are configured

**Issue**: CORS errors
- **Solution**: The backend is configured to allow requests from localhost:5173

## Features Roadmap

- [ ] User authentication
- [ ] Playlist creation
- [ ] Share songs with friends
- [ ] Export library to JSON/CSV
- [ ] Audio preview player
- [ ] Dark mode toggle
- [ ] Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music data
- [Gin Framework](https://gin-gonic.com/) for the Go web framework
- [React](https://react.dev/) for the frontend framework
- [Lucide Icons](https://lucide.dev/) for beautiful icons

## Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section
2. Ensure all prerequisites are installed
3. Verify your Spotify API credentials are correct
4. Check that both backend and frontend are running

---

Made with ❤️ for music lovers

