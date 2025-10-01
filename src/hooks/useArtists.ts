import { useState, useEffect } from 'react'

export interface Artist {
  name: string
  spotify_id: string
  instagram: string
  spotify: {
    artist_name: string
    genres: string[]
    followers: number
    popularity: number
    top_tracks: Array<{
      title: string
      preview_url: string | null
    }>
    last_checked: string
  }
  instagram: {
    username: string
    full_name: string
    followers: number
    following: number
    recent_posts: Array<{
      shortcode: string
      likes: number | null
      comments: number | null
      timestamp: string | null
    }>
    avg_posts_per_week: number
    last_checked: string
  } | null
}

export function useArtists() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/artists')
        
        if (!response.ok) {
          throw new Error('Failed to fetch artists')
        }
        
        const data = await response.json()
        setArtists(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching artists:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()
  }, [])

  return { artists, loading, error }
}

export function useArtist(id: string) {
  const [artist, setArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchArtist = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/artists/${id}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch artist')
        }
        
        const data = await response.json()
        setArtist(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching artist:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArtist()
  }, [id])

  return { artist, loading, error }
}
