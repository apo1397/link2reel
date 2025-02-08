from app.scraper import scrape_website
from app.analyzer import extract_key_points
from app.script_generator import generate_script
from app.video_generator import create_video

def process_url(url):
    try:
        content = scrape_website(url)
        key_points = extract_key_points(content)
        script = generate_script(key_points)
        video_url = create_video(script)
        return video_url
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

if __name__ == "__main__":
    url = input("Enter the product URL: ")
    video_url = process_url(url)
    if video_url:
        print(f"Generated Video URL: {video_url}")