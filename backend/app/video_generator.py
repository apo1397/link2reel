import requests
from moviepy.editor import ImageSequenceClip
import os

def create_video(script):
    api_key = os.getenv('YOUR_SYNTHESIA_API_KEY')
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

def generate_image(prompt: str) -> str:
    api_key = os.getenv('OPENAI_API_KEY')
    url = "https://api.openai.com/v1/images/generations"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "prompt": prompt,
        "n": 1,
        "size": "1024x1024"  # You can adjust the size as needed
    }
    response = requests.post(url, headers=headers, json=payload)
    image_url = response.json().get("data")[0].get("url")
    return image_url

def create_video_from_images(prompts: list, video_filename: str, fps: int = 24):
    image_urls = []
    for prompt in prompts:
        image_url = generate_image(prompt)
        image_urls.append(image_url)

    # Download images and create a video
    images = []
    for url in image_urls:
        response = requests.get(url)
        if response.status_code == 200:
            image_path = f"temp_image_{len(images)}.png"
            with open(image_path, 'wb') as f:
                f.write(response.content)
            images.append(image_path)

    # Create a video from the images
    clip = ImageSequenceClip(images, fps=fps)
    clip.write_videofile(video_filename)

    # Clean up temporary images if needed
    for image_path in images:
        os.remove(image_path)