#!/bin/bash

echo "🎵 Music Management System Setup"
echo "================================="
echo ""

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go 1.21 or higher."
    echo "   Download from: https://golang.org/dl/"
    exit 1
fi

echo "✅ Go is installed: $(go version)"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo "✅ npm is installed: $(npm --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please create it from .env.example"
    echo "   You need to add your Spotify API credentials!"
    echo ""
    echo "   Steps:"
    echo "   1. Go to https://developer.spotify.com/dashboard"
    echo "   2. Create an app"
    echo "   3. Copy your Client ID and Client Secret"
    echo "   4. Update the .env file with your credentials"
    echo ""
else
    echo "✅ .env file exists"
fi

echo "📥 Downloading Go dependencies..."
go mod download

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend

echo "📥 Installing npm dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "🚀 To start the application:"
echo "   1. Backend:  cd backend && go run main.go"
echo "   2. Frontend: cd frontend && npm run dev"
echo ""
echo "   Or use: ./start.sh (if available)"
echo ""
echo "⚠️  Don't forget to configure your Spotify API credentials in backend/.env"
echo ""



