import requests

def create_video(script):
    api_key = "YOUR_SYNTHESIA_API_KEY"
    url = "https://api.synthesia.io/v2/videos"
    headers = {"Authorization": api_key}
    payload = {
        "scriptText": script,
        "avatar": "anna_costume1_cameraA",  # Choose an avatar
        "background": "green_screen",
        "test": True  # Set to False for production
    }
    response = requests.post(url, headers=headers, json=payload)
    video_id = response.json().get("id")
    return f"https://share.synthesia.io/{video_id}"