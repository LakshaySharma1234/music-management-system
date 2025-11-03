package handlers

import (
	"music-management-system/database"
	"music-management-system/models"
	"music-management-system/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetAllSongs retrieves all songs from the database
func GetAllSongs(c *gin.Context) {
	var songs []models.Song

	// Optional genre filter
	genre := c.Query("genre")
	query := database.DB.Order("created_at DESC")

	if genre != "" {
		query = query.Where("genre = ?", genre)
	}

	if err := query.Find(&songs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch songs"})
		return
	}

	c.JSON(http.StatusOK, songs)
}

// GetSong retrieves a single song by ID
func GetSong(c *gin.Context) {
	id := c.Param("id")
	var song models.Song

	if err := database.DB.First(&song, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Song not found"})
		return
	}

	c.JSON(http.StatusOK, song)
}

// SearchSpotify searches for tracks on Spotify
func SearchSpotify(c *gin.Context) {
	query := c.Query("q")
	if query == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Query parameter 'q' is required"})
		return
	}

	limit := 20
	if limitStr := c.Query("limit"); limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil {
			limit = l
		}
	}

	results, err := services.SearchSpotifyTracks(query, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, results)
}

// CreateSong adds a new song to the database
func CreateSong(c *gin.Context) {
	var song models.Song

	if err := c.ShouldBindJSON(&song); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate rating
	if song.Rating < 0 || song.Rating > 10 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Rating must be between 0 and 10"})
		return
	}

	if err := database.DB.Create(&song).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create song"})
		return
	}

	c.JSON(http.StatusCreated, song)
}

// UpdateSong updates an existing song
func UpdateSong(c *gin.Context) {
	id := c.Param("id")
	var song models.Song

	if err := database.DB.First(&song, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Song not found"})
		return
	}

	var updateData models.Song
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate rating if provided
	if updateData.Rating < 0 || updateData.Rating > 10 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Rating must be between 0 and 10"})
		return
	}

	// Update fields
	if updateData.Rating != 0 {
		song.Rating = updateData.Rating
	}
	if updateData.Summary != "" {
		song.Summary = updateData.Summary
	}
	if updateData.Genre != "" {
		song.Genre = updateData.Genre
	}
	if updateData.Title != "" {
		song.Title = updateData.Title
	}
	if updateData.Artist != "" {
		song.Artist = updateData.Artist
	}

	if err := database.DB.Save(&song).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update song"})
		return
	}

	c.JSON(http.StatusOK, song)
}

// DeleteSong deletes a song from the database
func DeleteSong(c *gin.Context) {
	id := c.Param("id")

	if err := database.DB.Delete(&models.Song{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete song"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Song deleted successfully"})
}

// GetGenres retrieves all unique genres
func GetGenres(c *gin.Context) {
	var genres []string

	if err := database.DB.Model(&models.Song{}).Distinct("genre").Pluck("genre", &genres).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch genres"})
		return
	}

	c.JSON(http.StatusOK, genres)
}

// GetStats retrieves statistics about the music library
func GetStats(c *gin.Context) {
	var totalSongs int64
	var avgRating float64

	database.DB.Model(&models.Song{}).Count(&totalSongs)
	database.DB.Model(&models.Song{}).Select("AVG(rating)").Row().Scan(&avgRating)

	var genreCounts []struct {
		Genre string
		Count int64
	}
	database.DB.Model(&models.Song{}).
		Select("genre, COUNT(*) as count").
		Group("genre").
		Order("count DESC").
		Scan(&genreCounts)

	c.JSON(http.StatusOK, gin.H{
		"total_songs":    totalSongs,
		"average_rating": avgRating,
		"genres":         genreCounts,
	})
}


