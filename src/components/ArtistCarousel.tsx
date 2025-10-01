"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import Modal from "react-modal"
import { usePanel } from "@/components/providers/PanelProvider"
import { useArtists, type Artist } from "@/hooks/useArtists"

// Register Draggable plugin
if (typeof window !== "undefined" && gsap && Draggable) {
  gsap.registerPlugin(Draggable)
}

export function ArtistCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [modalArtist, setModalArtist] = useState<null | Artist>(null)
  const { openPanel } = usePanel()
  const { artists, loading, error } = useArtists()

  useEffect(() => {
    if (!trackRef.current) return
    let draggable: Draggable[] = []
    // Wait for DOM paint
    setTimeout(() => {
      draggable = Draggable.create(trackRef.current, {
        type: "x",
        edgeResistance: 0.85,
        inertia: true,
        bounds: trackRef.current.parentElement as Element,
        dragClickables: true,
        cursor: "grab"
      })
    }, 0)
    return () => {
      if (draggable && draggable[0]) draggable[0].kill()
    }
  }, [])

  const openArtistPanel = (artist: Artist) => {
    const genres = artist.spotify.genres.slice(0, 3).join(" / ") || "Various"
    const followers = artist.instagram?.followers || artist.spotify.followers || 0
    const bio = artist.instagram?.full_name || artist.name
    
    openPanel({
      type: "artist",
      title: artist.name,
      subtitle: "Bay Area Creator",
      image: `/avatars/${artist.name.toLowerCase().replace(/\s+/g, '')}.jpg`,
      description: `${bio} - ${genres} artist with ${followers.toLocaleString()} followers. ${artist.spotify.top_tracks.length > 0 ? `Top track: ${artist.spotify.top_tracks[0].title}` : ''}`,
      meta: {
        Genre: genres,
        City: "San Francisco / Oakland",
        Followers: followers,
        Popularity: artist.spotify.popularity,
        "Top Tracks": artist.spotify.top_tracks.length,
      },
      ctaLabel: "Follow Artist",
    })
  }

  if (loading) {
    return (
      <section id="artists" className="py-20 bg-background">
        <div className="text-center mb-12 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet the Artists
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Loading artists...
          </p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="artists" className="py-20 bg-background">
        <div className="text-center mb-12 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet the Artists
          </h2>
          <p className="text-xl text-red-500 max-w-2xl mx-auto">
            Error loading artists: {error}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="artists" className="py-20 bg-background">
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Meet the Artists
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Drag to explore the creative minds shaping Bay Area culture.
        </p>
      </div>
      <div className="overflow-x-hidden w-full relative">
        <div
          ref={trackRef}
          className="flex gap-8 cursor-grab select-none px-8"
          style={{ touchAction: "pan-x", willChange: "transform" }}
        >
          {artists.map((artist) => {
            const genres = artist.spotify.genres.slice(0, 2).join(" / ") || "Various"
            const followers = artist.instagram?.followers || artist.spotify.followers || 0
            const bio = artist.instagram?.full_name || artist.name
            
            return (
              <div
                key={artist.spotify_id}
                className="bg-muted rounded-xl shadow-lg flex-shrink-0 w-72 p-6 flex flex-col items-center justify-between hover:shadow-2xl transition-shadow duration-300"
                onClick={() => openArtistPanel(artist)}
              >
                <img
                  src={`/avatars/${artist.name.toLowerCase().replace(/\s+/g, '')}.jpg`}
                  alt={artist.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary"
                  onError={(e) => {
                    // Fallback to a default avatar if image doesn't exist
                    e.currentTarget.src = '/avatars/default.jpg'
                  }}
                />
                <h3 className="text-2xl font-bold mb-2 text-foreground text-center">{artist.name}</h3>
                <p className="text-base text-muted-foreground mb-2 text-center">{bio}</p>
                <p className="text-sm text-muted-foreground mb-4 text-center">{genres}</p>
                <div className="text-sm text-muted-foreground mb-4 text-center">
                  {followers.toLocaleString()} followers
                </div>
                <button
                  className="mt-auto px-6 py-2 rounded bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
                  onClick={(e) => {
                    e.stopPropagation()
                    setModalArtist(artist)
                  }}
                >
                  View Profile
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <Modal
        isOpen={!!modalArtist}
        onRequestClose={() => setModalArtist(null)}
        className="max-w-lg mx-auto my-20 bg-background rounded-xl shadow-2xl p-8 outline-none relative"
        overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        ariaHideApp={false}
      >
        {modalArtist && (
          <div className="flex flex-col items-center">
            <img
              src={`/avatars/${modalArtist.name.toLowerCase().replace(/\s+/g, '')}.jpg`}
              alt={modalArtist.name}
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-primary"
              onError={(e) => {
                e.currentTarget.src = '/avatars/default.jpg'
              }}
            />
            <h3 className="text-3xl font-bold mb-2 text-foreground text-center">{modalArtist.name}</h3>
            <p className="text-base text-muted-foreground mb-2 text-center">
              {modalArtist.instagram?.full_name || modalArtist.name}
            </p>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              {modalArtist.spotify.genres.slice(0, 3).join(" / ") || "Various"}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {(modalArtist.instagram?.followers || modalArtist.spotify.followers || 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {modalArtist.spotify.popularity}
                </div>
                <div className="text-sm text-muted-foreground">Popularity</div>
              </div>
            </div>
            {modalArtist.spotify.top_tracks.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-semibold text-foreground mb-2">Top Tracks:</div>
                <div className="text-sm text-muted-foreground">
                  {modalArtist.spotify.top_tracks.slice(0, 3).map((track, index) => (
                    <div key={index}>{index + 1}. {track.title}</div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-4 mt-4">
              <button
                className="px-4 py-2 rounded bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
                onClick={() => setModalArtist(null)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 rounded bg-accent text-accent-foreground font-semibold hover:bg-accent/80 transition"
                onClick={() => alert('Engage feature coming soon!')}
              >
                Engage
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
