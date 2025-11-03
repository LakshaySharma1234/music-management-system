# Quick Start Guide

Get your Music Management System up and running in 5 minutes!

## 🚀 Quick Setup

### 1. Get Spotify Credentials (2 minutes)

1. Visit [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Name it (e.g., "My Music Manager")
5. Copy your **Client ID** and **Client Secret**

### 2. Configure Backend (1 minute)

Open `backend/.env` and update:

```env
SPOTIFY_CLIENT_ID=paste_your_client_id_here
SPOTIFY_CLIENT_SECRET=paste_your_client_secret_here
```

### 3. Run Setup Script (2 minutes)

```bash
# Make scripts executable (first time only)
chmod +x setup.sh start.sh

# Run setup
./setup.sh
```

Or manually:

```bash
# Backend
cd backend
go mod download
cd ..

# Frontend
cd frontend
npm install
cd ..
```

### 4. Start the Application

**Option A - Using start script:**
```bash
./start.sh
```

**Option B - Manual (2 terminals):**

Terminal 1 - Backend:
```bash
cd backend
go run main.go
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### 5. Open Your Browser

Navigate to: **http://localhost:5173**

## 🎵 First Steps

1. Click **"Add from Spotify"**
2. Search for your favorite song
3. Click on the song result
4. Add:
   - Genre (e.g., "Pop")
   - Rating (0-10)
   - Your thoughts about the song
5. Click **"Add to Library"**

That's it! You're ready to build your music collection! 🎉

## ⚡ Troubleshooting

**Backend won't start:**
- Check if Spotify credentials are set in `backend/.env`
- Make sure port 8080 is available

**Frontend shows errors:**
- Ensure backend is running first
- Check if port 5173 is available

**Can't search Spotify:**
- Verify Spotify credentials in `backend/.env`
- Check backend logs for errors

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore all features in the app
- Customize the genres and ratings to your preference

---

Happy music organizing! 🎵

