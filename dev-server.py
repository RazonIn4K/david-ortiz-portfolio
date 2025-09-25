#!/usr/bin/env python3
"""
Enhanced development server with API endpoint support
Fixes 501 errors for chat and analytics endpoints during development
"""

import http.server
import socketserver
import json
import os
import time
import random
from urllib.parse import urlparse, parse_qs
from datetime import datetime
import threading
import sys

# Load environment variables from .env file if it exists
def load_env():
    env_path = '.env'
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()
        print(f"✓ Loaded environment variables from .env")

# Load environment variables on startup
load_env()

class EnhancedHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Enhanced HTTP handler with API endpoint support"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

    def do_POST(self):
        """Handle POST requests for API endpoints"""
        parsed_path = urlparse(self.path)

        # Read request body
        content_length = int(self.headers.get('content-length', 0))
        post_data = self.rfile.read(content_length)

        try:
            body = json.loads(post_data.decode('utf-8')) if post_data else {}
        except json.JSONDecodeError:
            body = {}

        # Handle different API endpoints
        if parsed_path.path == '/api/chat':
            self.handle_chat_api(body)
        elif parsed_path.path == '/api/analytics':
            self.handle_analytics_api(body)
        elif parsed_path.path == '/_vercel/insights/view':
            self.handle_vercel_insights(body)
        elif parsed_path.path == '/api/chat-log':
            self.handle_chat_log_api(body)
        else:
            self.send_error(404, f"API endpoint not found: {parsed_path.path}")

    def handle_chat_api(self, body):
        """Mock chat API response"""
        message = body.get('message', '')
        session_id = body.get('sessionId', 'dev-session')

        # Simulate processing time
        time.sleep(random.uniform(0.8, 2.0))

        # Generate mock responses based on message content
        responses = {
            'database': "David has extensive experience optimizing PostgreSQL databases, achieving 87% performance improvements and saving clients $40K annually through strategic indexing and query restructuring.",
            'cloud': "David specializes in multi-cloud infrastructure optimization across AWS, GCP, and Azure, helping startups reduce costs by 35% through automated rightsizing and scheduling systems.",
            'performance': "Performance optimization is David's specialty - he's turned 10+ second analytical queries into 1.3-second responses through systematic query execution plan analysis and strategic indexing.",
            'monitoring': "David builds predictive monitoring systems using Datadog that identify bottlenecks 20 minutes before they impact users, reducing emergency support calls by 60%.",
            'default': f"Thanks for your question about '{message}'. David is a Cloud Support Engineer specializing in database optimization and infrastructure management. His recent achievements include reducing query times from 10+ seconds to 1.3 seconds, saving clients significant costs through strategic performance improvements."
        }

        # Select appropriate response
        response_text = responses['default']
        for keyword, response in responses.items():
            if keyword in message.lower():
                response_text = response
                break

        response = {
            'success': True,
            'response': response_text,
            'responseTime': random.randint(800, 2000),
            'sessionId': session_id,
            'model': 'dev-mock',
            'timestamp': datetime.now().isoformat()
        }

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        self.wfile.write(json.dumps(response).encode('utf-8'))
        print(f"🤖 Chat API: '{message[:50]}...' -> {len(response_text)} chars")

    def handle_analytics_api(self, body):
        """Mock analytics API response"""
        # Handle both list and dict formats
        if isinstance(body, list):
            events = body
            session_id = 'dev-session'
        else:
            events = body.get('events', []) if isinstance(body, dict) else []
            session_id = body.get('sessionId', 'dev-session') if isinstance(body, dict) else 'dev-session'

        response = {
            'success': True,
            'message': 'Analytics data processed (dev mode)',
            'eventsProcessed': len(events),
            'sessionId': session_id,
            'timestamp': datetime.now().isoformat()
        }

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        self.wfile.write(json.dumps(response).encode('utf-8'))
        print(f"📊 Analytics API: Processed {len(events)} events")

    def handle_vercel_insights(self, body):
        """Mock Vercel Speed Insights"""
        response = {
            'success': True,
            'message': 'Speed insights recorded (dev mode)',
            'timestamp': datetime.now().isoformat()
        }

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        self.wfile.write(json.dumps(response).encode('utf-8'))
        print("⚡ Speed Insights: Recorded (dev mode)")

    def handle_chat_log_api(self, body):
        """Mock chat logging API"""
        response = {
            'success': True,
            'message': 'Chat logged (dev mode)',
            'logId': f"dev-log-{int(time.time())}",
            'timestamp': datetime.now().isoformat()
        }

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        self.wfile.write(json.dumps(response).encode('utf-8'))
        print("💾 Chat Log API: Logged interaction (dev mode)")

    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Access-Control-Max-Age', '86400')
        self.end_headers()

    def end_headers(self):
        """Add security headers to all responses"""
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        super().end_headers()

def run_server(port=9000):
    """Run the enhanced development server"""
    handler = EnhancedHTTPRequestHandler

    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"🚀 Enhanced Development Server running at http://localhost:{port}/")
        print("📡 API Endpoints available:")
        print("   • POST /api/chat - AI Chat responses")
        print("   • POST /api/analytics - Analytics tracking")
        print("   • POST /api/chat-log - Chat logging")
        print("   • POST /_vercel/insights/view - Speed insights")
        print("💡 All APIs return mock responses for development")
        print("🔄 Use Ctrl+C to stop the server")

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 9000
    run_server(port)