package models

import (
	"time"
)

type Song struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	SpotifyID   string    `gorm:"uniqueIndex" json:"spotify_id"`
	Title       string    `json:"title"`
	Artist      string    `json:"artist"`
	Album       string    `json:"album"`
	Genre       string    `json:"genre"`
	ImageURL    string    `json:"image_url"`
	PreviewURL  string    `json:"preview_url"`
	Rating      int       `json:"rating"`
	Summary     string    `json:"summary"`
	ReleaseDate string    `json:"release_date"`
	Duration    int       `json:"duration"` // in milliseconds
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type SpotifySearchResult struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Artist      string `json:"artist"`
	Album       string `json:"album"`
	ImageURL    string `json:"image_url"`
	PreviewURL  string `json:"preview_url"`
	ReleaseDate string `json:"release_date"`
	Duration    int    `json:"duration"`
}


