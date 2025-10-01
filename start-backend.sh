#!/bin/bash

# Navigate to backend directory
cd backend

# Check if virtual environment exists, if not create one
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Start the Flask backend
echo "Starting Flask backend on port 5000..."
python app.py
