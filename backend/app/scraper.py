import requests
import os
from dotenv import load_dotenv
from utils.logger import setup_logger

# Load environment variables
load_dotenv()

# Create logger for this module
logger = setup_logger(__name__)

def scrape_website(url):
    token = os.getenv('DIFFBOT_TOKEN')
    api_url = f"https://api.diffbot.com/v3/article?token={token}&url={url}"
    response = requests.get(api_url)
    data = response.json()
    logger.debug(f"Successfully scraped data from {url}")
    return data.get("objects", [{}])[0].get("text", "")

class Scraper:
    def __init__(self):
        logger.info("Initializing scraper")
        self.token = os.getenv('DIFFBOT_TOKEN')

    def scrape_url(self, url):
        logger.info(f"Starting to scrape URL: {url}")
        try:
            api_url = f"https://api.diffbot.com/v3/article?token={self.token}&url={url}"
            response = requests.get(api_url)
            data = response.json()
            logger.debug(f"Successfully scraped data from {url}")
            return data
        except Exception as e:
            logger.error(f"Error scraping URL {url}: {str(e)}", exc_info=True)
            raise

    def process_content(self, content):
        logger.info("Processing scraped content")
        try:
            # ... existing processing code ...
            logger.debug("Content processing completed successfully")
            return processed_data
        except Exception as e:
            logger.error(f"Error processing content: {str(e)}", exc_info=True)
            raise