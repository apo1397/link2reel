import openai

openai.api_key = "sk-proj-1234567890"

def generate_script(key_points):
    prompt = f"Write a catchy marketing script highlighting the following features:\n{', '.join(key_points)}."
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=200
    )
    script = response.choices[0].message.content.strip()
    return script