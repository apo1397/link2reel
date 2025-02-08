from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from .models import GenericModel
from .analyzer import ContentAnalyzer
from .scraper import scrape_website
from .extensions import db
from utils.logger import setup_logger
import validators
import traceback
import re
from urllib.parse import parse_qs

# Create blueprint
api = Blueprint('api', __name__)
logger = setup_logger(__name__)

# Add mock data constants
MOCK_USPS = [
    "🚀 Innovative product design that sets new industry standards",
    "💰 Exceptional value for money with premium features",
    "⭐ High customer satisfaction with 4.8/5 average rating",
    "🔒 Built with security and privacy in mind",
    "🌟 Intuitive interface for seamless user experience",
    "⚡ Lightning-fast performance and reliability"
]

MOCK_SCRIPT_TEMPLATE = """🎥 Check out this amazing product!

{usp_list}

{feedback_section}

🔥 Don't miss out on these incredible features!
👉 Visit {url} to learn more
#ProductReview #MustHave #Innovation"""

def is_valid_url(url: str) -> bool:
    """Validate the URL format."""
    regex = re.compile(
        r'^(?:http|ftp)s?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|'  # ...or ipv4
        r'\[?[A-F0-9]*:[A-F0-9:]+\]?)'  # ...or ipv6
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, url) is not None

@api.route('/generate-usp', methods=['POST', 'OPTIONS'])
@cross_origin()
def generate():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
        
    try:
        # Check if mock mode is enabled
        use_mock = request.args.get('mock', '').lower() == 'true'
        logger.info(f"Mock mode: {use_mock}")

        if not request.is_json:
            return jsonify({'error': 'Missing JSON in request'}), 400
            
        url = request.json.get('url')
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
            
        if not validators.url(url):
            return jsonify({'error': 'Invalid URL format'}), 400

        if use_mock:
            logger.info("Using mock USPs data")
            usps = MOCK_USPS
        else:
            # Real implementation
            logger.info(f"Scraping content from {url}")
            content = scrape_website(url)
            
            if not content:
                return jsonify({'error': 'Failed to scrape content from URL'}), 400
            
            analyzer = ContentAnalyzer()
            usps = analyzer.analyze(content)
            
            if not usps:
                return jsonify({'error': 'Failed to generate USPs'}), 400

        return jsonify({
            'usps': usps,
            'url': url,
            'status': 'success'
        })

    except Exception as e:
        logger.error(f"Error in generate endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@api.route('/generate-script', methods=['POST', 'OPTIONS'])
@cross_origin()
def generate_script():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
        
    try:
        use_mock = request.args.get('mock', '').lower() == 'true'
        
        data = request.json
        url = data.get('url')
        usps = data.get('usps')
        feedback = data.get('feedback', '')
        
        if not url or not usps:
            return jsonify({'error': 'URL and USPs are required'}), 400

        if use_mock:
            logger.info("Using mock script template")
            usp_list = '\n'.join(f'✨ {usp}' for usp in usps)
            feedback_section = f"\n✍️ {feedback}\n" if feedback else ""
            script = MOCK_SCRIPT_TEMPLATE.format(
                usp_list=usp_list,
                feedback_section=feedback_section,
                url=url
            )
        else:
            analyzer = ContentAnalyzer()
            script = analyzer.generate_script(url, usps, feedback)

        return jsonify({
            'script': script,
            'status': 'success'
        })

    except Exception as e:
        logger.error(f"Error in generate-script endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({'error': str(e)}), 500 