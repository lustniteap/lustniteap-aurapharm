from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from openai import AzureOpenAI
from datetime import datetime
import instaloader
import time
import itertools
import json

app = Flask(__name__)
CORS(app)

# =======================
# 1. Spotify Setup
# =======================
SPOTIFY_CLIENT_ID = "2e431872fdd84536a17d92782f491ca7"
SPOTIFY_CLIENT_SECRET = "5add546f3e1a43ff84b94f584eaf25bf"

auth_manager = SpotifyClientCredentials(
    client_id=SPOTIFY_CLIENT_ID,
    client_secret=SPOTIFY_CLIENT_SECRET
)
sp = spotipy.Spotify(auth_manager=auth_manager)

# =======================
# 2. Instagram Setup
# =======================
L = instaloader.Instaloader()

# Optionally login using environment variables to avoid anonymous rate-limits
IG_USERNAME = os.getenv("INSTAGRAM_USERNAME")
IG_PASSWORD = os.getenv("INSTAGRAM_PASSWORD")
if IG_USERNAME and IG_PASSWORD:
    try:
        L.context.log(f"Logging in as {IG_USERNAME}")
        L.login(IG_USERNAME, IG_PASSWORD)
    except Exception as e:
        L.context.log(f"Instagram login failed: {e}")

def get_instagram_metrics(username, max_retries=5):
    """
    Fetch lightweight Instagram metrics with retries and optional login.

    Returns a dict or None on failure.
    """
    for attempt in range(1, max_retries + 1):
        try:
            L.context.log(f"Fetching Instagram profile for {username} (attempt {attempt})")

            profile = instaloader.Profile.from_username(L.context, username)

            # Fetch only the 5 most recent posts (use islice to avoid downloading everything)
            posts = list(itertools.islice(profile.get_posts(), 5))

            recent_posts = []
            for post in posts:
                recent_posts.append({
                    "shortcode": post.shortcode,
                    "likes": getattr(post, "likes", None),
                    "comments": getattr(post, "comments", None),
                    "timestamp": post.date_utc.isoformat() if hasattr(post, "date_utc") else None
                })

            # Estimate posting frequency (posts per week)
            if len(recent_posts) >= 2:
                delta_days = (posts[0].date_utc - posts[-1].date_utc).days
                avg_posts_per_week = len(recent_posts) / (delta_days / 7) if delta_days > 0 else len(recent_posts)
            else:
                avg_posts_per_week = len(recent_posts)

            metrics = {
                "username": profile.username,
                "full_name": profile.full_name,
                "followers": profile.followers,
                "following": profile.followees,
                "recent_posts": recent_posts,
                "avg_posts_per_week": round(avg_posts_per_week, 2),
                "last_checked": datetime.now().isoformat()
            }
            return metrics

        except Exception as e:
            msg = str(e)
            L.context.log(f"Error fetching {username}: {msg}")

            # Common messages that indicate rate-limiting or temporary IP blocks
            if "403" in msg or "401" in msg or "Please wait a few minutes" in msg or "rate limit" in msg.lower():
                # If credentials exist and we haven't logged in, try to login once and retry immediately
                if IG_USERNAME and IG_PASSWORD and not L.context.is_logged_in:
                    try:
                        L.context.log("Attempting login to bypass anonymous rate limits...")
                        L.login(IG_USERNAME, IG_PASSWORD)
                        # immediate retry
                        continue
                    except Exception as le:
                        L.context.log(f"Login attempt failed: {le}")

                # exponential backoff before retrying
                sleep_for = min(60, 2 ** attempt)
                L.context.log(f"Rate-limited or blocked; sleeping for {sleep_for}s before retrying...")
                time.sleep(sleep_for)
                continue

            # If it's some other error (profile not found / private / network), don't keep retrying
            L.context.log("Non-retryable error or profile missing; aborting fetch.")
            return None

    L.context.log(f"Exceeded max retries ({max_retries}) for {username}")
    return None

# =======================
# 3. Sample Artists
# =======================
sample_artists = [
    {"name": "Dee Dot Jones", "spotify_id": "7HtgNyDBpRGmXi9Ctc2aEg", "instagram": "deedotjones"},
    {"name": "Lust Nite", "spotify_id": "4z2juebHany2CLJa1PZNEQ", "instagram": "lust.nite"},
]

# =======================
# 4. Fetch Spotify Metrics
# =======================
def get_spotify_profile(artist_id):
    artist = sp.artist(artist_id)
    top_tracks_data = sp.artist_top_tracks(artist_id, country='US')

    profile = {
        "artist_name": artist.get("name"),
        "genres": artist.get("genres", []),
        "followers": artist.get("followers", {}).get("total"),
        "popularity": artist.get("popularity"),
        "top_tracks": [
            {"title": track["name"], "preview_url": track.get("preview_url")}
            for track in top_tracks_data.get("tracks", [])
        ],
        "last_checked": datetime.now().isoformat()
    }
    return profile

# =======================
# 5. Azure GPT Integration
# =======================
def generate_strategy(artist_profile):
    client = AzureOpenAI(
        api_key=os.getenv("AZURE_OPENAI_KEY"),
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_version="2024-08-01-preview"
    )

    deployment_name = "gpt-artist-manager"  # Replace with your deployment name

    system_prompt = """
    You are an elite artist manager and A&R strategist. 
    Your goal is to analyze any input (songs, lyrics, stats, fan engagement, market data) and provide actionable strategies to maximize the artist's creative and commercial success. 
    Always give recommendations in clear, prioritized steps, balancing short-term wins with long-term career sustainability. 
    You should maintain a lighthearted tone, always encouraging, enthusiastic. 
    Think of a personal trainer or coach. 
    The user should feel that you genuinely cares about their career and believes in the potential success of the user.
    Output in structured format:
    {
        "short_term": ["..."],
        "long_term": ["..."],
        "content_ideas": ["..."],
        "collaboration_suggestions": ["..."]
    }
    """

    user_prompt = f"Artist Profile:\n{artist_profile}\n\nGenerate a detailed strategy."

    response = client.chat.completions.create(
        model=deployment_name,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7,
        max_tokens=800
    )

    return response.choices[0].message.content

# =======================
# 6. API Routes
# =======================

@app.route('/api/artists', methods=['GET'])
def get_artists():
    """Get all sample artists with their data"""
    try:
        artists_data = []
        for artist in sample_artists:
            spotify_profile = get_spotify_profile(artist["spotify_id"])
            instagram_profile = get_instagram_metrics(artist["instagram"])
            
            # Combine profiles
            combined_profile = {
                "name": artist["name"],
                "spotify_id": artist["spotify_id"],
                "instagram": artist["instagram"],
                "spotify": spotify_profile,
                "instagram": instagram_profile
            }
            artists_data.append(combined_profile)
        
        return jsonify(artists_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/artists/<artist_id>', methods=['GET'])
def get_artist(artist_id):
    """Get specific artist data by Spotify ID"""
    try:
        artist = next((a for a in sample_artists if a["spotify_id"] == artist_id), None)
        if not artist:
            return jsonify({"error": "Artist not found"}), 404
        
        spotify_profile = get_spotify_profile(artist["spotify_id"])
        instagram_profile = get_instagram_metrics(artist["instagram"])
        
        combined_profile = {
            "name": artist["name"],
            "spotify_id": artist["spotify_id"],
            "instagram": artist["instagram"],
            "spotify": spotify_profile,
            "instagram": instagram_profile
        }
        
        return jsonify(combined_profile)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/artists/<artist_id>/strategy', methods=['GET'])
def get_artist_strategy(artist_id):
    """Get AI-generated strategy for specific artist"""
    try:
        artist = next((a for a in sample_artists if a["spotify_id"] == artist_id), None)
        if not artist:
            return jsonify({"error": "Artist not found"}), 404
        
        spotify_profile = get_spotify_profile(artist["spotify_id"])
        instagram_profile = get_instagram_metrics(artist["instagram"])
        
        combined_profile = {
            "spotify": spotify_profile,
            "instagram": instagram_profile
        }
        
        strategy = generate_strategy(combined_profile)
        return jsonify({"strategy": strategy})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
