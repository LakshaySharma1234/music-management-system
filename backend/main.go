package main

import (
	"log"
	"music-management-system/database"
	"music-management-system/handlers"
	"music-management-system/services"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Initialize database
	database.InitDatabase()

	// Initialize Spotify service
	if err := services.InitSpotify(); err != nil {
		log.Printf("Warning: Spotify initialization failed: %v\n", err)
	}

	// Setup router
	router := gin.Default()

	// CORS middleware
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:5174"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// API routes
	api := router.Group("/api")
	{
		// Songs endpoints
		api.GET("/songs", handlers.GetAllSongs)
		api.GET("/songs/:id", handlers.GetSong)
		api.POST("/songs", handlers.CreateSong)
		api.PUT("/songs/:id", handlers.UpdateSong)
		api.DELETE("/songs/:id", handlers.DeleteSong)

		// Spotify search endpoint
		api.GET("/spotify/search", handlers.SearchSpotify)

		// Utility endpoints
		api.GET("/genres", handlers.GetGenres)
		api.GET("/stats", handlers.GetStats)
	}

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s...", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
