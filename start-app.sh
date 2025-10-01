#!/bin/bash

echo "🚀 Starting AuraPharm Landing Page with Backend Integration"
echo "=========================================================="

# Function to cleanup background processes
cleanup() {
    echo "🛑 Stopping services..."
    pkill -f "python app.py" 2>/dev/null
    pkill -f "next dev" 2>/dev/null
    exit 0
}

# Set up cleanup on script exit
trap cleanup EXIT INT TERM

# Start backend in background
echo "📡 Starting Python backend on port 8000..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 5

# Test backend
if curl -s http://localhost:8000/api/health > /dev/null; then
    echo "✅ Backend is running successfully"
else
    echo "❌ Backend failed to start"
    exit 1
fi

# Start frontend in background
echo "🎨 Starting Next.js frontend on port 3000..."
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to start
echo "⏳ Waiting for frontend to initialize..."
sleep 8

# Test frontend
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is running successfully"
else
    echo "❌ Frontend failed to start"
    exit 1
fi

echo ""
echo "🎉 AuraPharm Landing Page is now running!"
echo "=========================================="
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo ""
echo "📱 Opening browser..."
open http://localhost:3000

echo ""
echo "Press Ctrl+C to stop both services"
echo ""

# Keep script running and wait for user to stop
wait
