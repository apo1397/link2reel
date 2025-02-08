import openai
import os
from dotenv import load_dotenv
from utils.logger import setup_logger

# Load environment variables
load_dotenv()

# Set OpenAI API key from environment
openai.api_key = os.getenv('OPENAI_API_KEY')

logger = setup_logger(__name__)

class ContentAnalyzer:
    def __init__(self):
        logger.info("Initializing content analyzer")
        if not openai.api_key:
            raise ValueError("OpenAI API key not found in environment variables")
        # ... existing initialization code ...

    def analyze(self, content):
        # logger.info("Starting content analysis for content: " + content)
        # print("Starting content analysis for content: " + content)
        try:
            prompt = f'''You are an expert marketing analyst. Your task is to analyze the following product description and identify the top 3 unique selling points (USPs) or key features that would make this product stand out in a short, engaging social media video. Focus on features that are likely to grab attention, evoke emotion, or drive interest.

Product Description:
{content}

Instructions:
1. Identify the top 3 USPs or key features.
2. Ensure each USP is concise (1-2 sentences max).
3. Highlight benefits, not just features.
4. Prioritize aspects that are unique, exciting, or solve a clear problem.

Output Format:
1. [Description of the first USP]
2. [Description of the second USP]
3. [Description of the third USP]'''
            # logger.info("Prompt: " + prompt)
            print("Prompt for USP generation is "+ prompt)
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=1000
            )
            analysis_results = response.choices[0].message.content.strip().split("\n")
            # print("Analysis results: " + str(analysis_results))
            logger.debug("Content analysis completed successfully")
            return analysis_results
        except Exception as e:
            logger.error(f"Error during content analysis: {str(e)}", exc_info=True)
            raise

    def generate_script(self,url,analysis,feedback):
        logger.info("Generating script from analysis")
        try:
            prompt = f'''
You are a professional scriptwriter specializing in viral social media content. Your task is to create a short, engaging script for a TikTok or Instagram Reel based on the following USPs. The script must:
1. Start with a strong hook to grab attention in the first 3 seconds.
2. Highlight the USPs in a way that resonates emotionally with the audience.
3. Include a clear call-to-action (CTA) with the product's website or link.
4. Be optimized for virality, using conversational tone, trending phrases, and relatable scenarios.'''
            if feedback : 
                prompt+= f'''Incorporate the following feedback given to you for an earlier output : {feedback}'''
            prompt+=f'''USPs:
{analysis}

Website/Link:
{url}

Instructions:
1. Write a script no longer than 30 seconds.
2. Use a conversational tone and keep it fun, energetic, and relatable.
3. End with a compelling CTA encouraging viewers to visit the website or try the product.

Output Format:
[Opening Hook]
[Highlight USP 1]
[Highlight USP 2]
[Highlight USP 3]
[Call-to-Action]'''
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=1000
            )
            script = response.choices[0].message.content.strip()
            logger.info("Script generated successfully : {script}")
            
            return script
        except Exception as e:
            logger.error(f"Error generating script: {e}")
            return "An error occurred while generating the script."
    
    def extract_key_points(self, analysis):
        logger.info("Extracting key points from analysis")
        try:
            key_points = []  # Initialize key_points
            # ... existing extraction code ...
            logger.debug("Key points extracted successfully")
            return key_points
        except Exception as e:
            logger.error(f"Error extracting key points: {str(e)}", exc_info=True)
            raise