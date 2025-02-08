# backend/app/__init__.py

from .scraper import scrape_website, Scraper
from .analyzer import ContentAnalyzer
from .video_generator import create_video
from flask import Flask
from flask_cors import CORS
from .extensions import db
from .routes import api

# Expose these classes/functions at the package level
__all__ = [
    "scrape_website",
    "Scraper",
    "ContentAnalyzer",
    "create_video"
]

# Empty file to make the directory a Python package

def create_app():
    app = Flask(__name__)
    
    # Configure CORS - Allow all origins in development
    CORS(app, resources={
        r"/*": {  # Allow all routes
            "origins": ["http://localhost:3001"],  # Updated frontend port
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
        }
    })
    
    # Register blueprints
    app.register_blueprint(api, url_prefix='/api')
    
    # Configure SQLite database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///link2reel.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize the database with the app
    db.init_app(app)

    with app.app_context():
        db.create_all()  # Create database tables

    return app