import openai

openai.api_key = "YOUR_OPENAI_API_KEY"

def extract_key_points(text):
    prompt = f"Extract the top 3 unique selling points (USPs) or key features from the following text:\n\n{text}"
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=100
    )
    key_points = response.choices[0].message.content.strip().split("\n")
    return key_points