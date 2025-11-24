#!/bin/bash

# Simple local server script for testing the portfolio

echo "🌐 Starting local web server..."
echo "================================"
echo ""
echo "Your portfolio will be available at:"
echo "  http://localhost:8888"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "================================"
echo ""

cd "$(dirname "$0")"
python3 -m http.server 8888

