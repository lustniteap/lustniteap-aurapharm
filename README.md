# AuraPharm Landing Page with Artist Backend

A modern landing page for AuraPharm with integrated artist data backend that fetches real-time data from Spotify and Instagram APIs.

## Features

- **Modern Landing Page**: Built with Next.js, TypeScript, and Tailwind CSS
- **Real-time Artist Data**: Fetches data from Spotify and Instagram APIs
- **AI-Powered Insights**: Uses Azure OpenAI to generate artist strategies
- **Interactive UI**: Drag-to-explore artist carousel with detailed profiles
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- React Modal

### Backend
- Python Flask
- Spotipy (Spotify API)
- Instaloader (Instagram API)
- Azure OpenAI
- Flask-CORS

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Spotify API credentials
- Instagram credentials (optional)
- Azure OpenAI API key

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run setup
```

### 2. Environment Configuration

Copy the environment template and fill in your API keys:

```bash
# Copy environment files
cp env.local.example .env.local
cp backend/env.example backend/.env
```

Edit `.env.local`:
```env
BACKEND_URL=http://localhost:5000
```

Edit `backend/.env`:
```env
# Instagram credentials (optional - helps avoid rate limits)
INSTAGRAM_USERNAME=your_instagram_username
INSTAGRAM_PASSWORD=your_instagram_password

# Azure OpenAI credentials
AZURE_OPENAI_KEY=your_azure_openai_key
AZURE_OPENAI_ENDPOINT=your_azure_openai_endpoint
```

### 3. Running the Application

#### Option 1: Run Both Frontend and Backend Together
```bash
npm run dev:full
```

#### Option 2: Run Separately
```bash
# Terminal 1: Start backend
npm run backend

# Terminal 2: Start frontend
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

- `GET /api/artists` - Get all artists with their data
- `GET /api/artists/{id}` - Get specific artist data
- `GET /api/artists/{id}/strategy` - Get AI-generated strategy for artist
- `GET /api/health` - Health check

## Project Structure

```
├── backend/                 # Python Flask backend
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Backend environment variables
├── src/
│   ├── app/
│   │   └── api/           # Next.js API routes (proxy to backend)
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
├── public/               # Static assets
└── package.json         # Frontend dependencies and scripts
```

## Artist Data

The application currently includes two sample artists:
- Dee Dot Jones
- Lust Nite

To add more artists, edit the `sample_artists` array in `backend/app.py`.

## Development

### Adding New Artists
1. Edit `backend/app.py` and add to the `sample_artists` array
2. Include Spotify ID and Instagram username
3. Restart the backend server

### Customizing the UI
- Edit components in `src/components/`
- Modify styles in `src/app/globals.css`
- Update Tailwind config in `tailwind.config.ts`

## Troubleshooting

### Backend Issues
- Ensure Python virtual environment is activated
- Check that all dependencies are installed
- Verify API keys are correctly set in `.env`

### Frontend Issues
- Clear browser cache
- Check browser console for errors
- Ensure backend is running on port 5000

### API Rate Limits
- Instagram API has rate limits for anonymous requests
- Add Instagram credentials to reduce rate limiting
- Consider implementing caching for production use

## License

This project is for demonstration purposes.