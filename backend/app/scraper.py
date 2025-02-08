import requests

def scrape_website(url):
    token = "YOUR_DIFFBOT_TOKEN"
    api_url = f"https://api.diffbot.com/v3/article?token={token}&url={url}"
    response = requests.get(api_url)
    data = response.json()
    return data.get("objects", [{}])[0].get("text", "")