package services

import (
	"context"
	"fmt"
	"log"
	"music-management-system/models"
	"os"

	"github.com/zmb3/spotify/v2"
	spotifyauth "github.com/zmb3/spotify/v2/auth"
	"golang.org/x/oauth2/clientcredentials"
)

var spotifyClient *spotify.Client

func InitSpotify() error {
	clientID := os.Getenv("SPOTIFY_CLIENT_ID")
	clientSecret := os.Getenv("SPOTIFY_CLIENT_SECRET")

	if clientID == "" || clientSecret == "" {
		log.Println("Warning: Spotify credentials not set. Search functionality will be limited.")
		return nil
	}

	config := &clientcredentials.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		TokenURL:     spotifyauth.TokenURL,
	}

	token, err := config.Token(context.Background())
	if err != nil {
		return fmt.Errorf("couldn't get token: %v", err)
	}

	httpClient := spotifyauth.New().Client(context.Background(), token)
	spotifyClient = spotify.New(httpClient)

	log.Println("Spotify client initialized successfully")
	return nil
}

func SearchSpotifyTracks(query string, limit int) ([]models.SpotifySearchResult, error) {
	if spotifyClient == nil {
		return nil, fmt.Errorf("spotify client not initialized")
	}

	ctx := context.Background()
	results, err := spotifyClient.Search(ctx, query, spotify.SearchTypeTrack, spotify.Limit(limit))
	if err != nil {
		return nil, err
	}

	var tracks []models.SpotifySearchResult
	for _, track := range results.Tracks.Tracks {
		imageURL := ""
		if len(track.Album.Images) > 0 {
			imageURL = track.Album.Images[0].URL
		}

		previewURL := track.PreviewURL

		artists := ""
		for i, artist := range track.Artists {
			if i > 0 {
				artists += ", "
			}
			artists += artist.Name
		}

		tracks = append(tracks, models.SpotifySearchResult{
			ID:          track.ID.String(),
			Title:       track.Name,
			Artist:      artists,
			Album:       track.Album.Name,
			ImageURL:    imageURL,
			PreviewURL:  previewURL,
			ReleaseDate: track.Album.ReleaseDate,
			Duration:    track.Duration,
		})
	}

	return tracks, nil
}

func GetTrackDetails(trackID string) (*models.SpotifySearchResult, error) {
	if spotifyClient == nil {
		return nil, fmt.Errorf("spotify client not initialized")
	}

	ctx := context.Background()
	track, err := spotifyClient.GetTrack(ctx, spotify.ID(trackID))
	if err != nil {
		return nil, err
	}

	imageURL := ""
	if len(track.Album.Images) > 0 {
		imageURL = track.Album.Images[0].URL
	}

	previewURL := track.PreviewURL

	artists := ""
	for i, artist := range track.Artists {
		if i > 0 {
			artists += ", "
		}
		artists += artist.Name
	}

	return &models.SpotifySearchResult{
		ID:          track.ID.String(),
		Title:       track.Name,
		Artist:      artists,
		Album:       track.Album.Name,
		ImageURL:    imageURL,
		PreviewURL:  previewURL,
		ReleaseDate: track.Album.ReleaseDate,
		Duration:    track.Duration,
	}, nil
}
