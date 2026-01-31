import argparse
import base64
import json
import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL_ID = "google/gemini-3-pro-image-preview"

# Advanced SOP Prompt
ADVANCED_PROMPT_TEMPLATE = """
You are an advanced image-editing and scene-reconstruction model.
You are given two reference images:
Image A (Pavement Reference): Exact paving pattern, material, and texture.
Image B (Scene Reference): Street scene, buildings, and lighting to preserve.

OBJECTIVE: Recreate Image B, replacing its ground surface with pavement from Image A.
The result must be photorealistic, maintaining perspective, lighting, and physical integration.
Do NOT change buildings or architecture. Do NOT stylize.
"""

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def generate_reconstruction(pavement_image_path, scene_image_path, output_dir=None):
    if not OPENROUTER_API_KEY:
        print("Error: OPENROUTER_API_KEY not found in .env file.")
        return None

    # Default to project root .tmp/generations if not specified
    if output_dir is None:
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        output_dir = os.path.join(base_dir, ".tmp", "generations")

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print(f"Reconstructing scene using:\n - Pavement: {pavement_image_path}\n - Scene: {scene_image_path}")

    url = "https://openrouter.ai/api/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        pavement_base64 = encode_image(pavement_image_path)
        scene_base64 = encode_image(scene_image_path)

        data = {
            "model": MODEL_ID,
            "modalities": ["image", "text"],
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": ADVANCED_PROMPT_TEMPLATE},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{pavement_base64}"
                            }
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{scene_base64}"
                            }
                        }
                    ]
                }
            ]
        }

        response = requests.post(url, headers=headers, data=json.dumps(data))
        response.raise_for_status()
        result = response.json()
        
        # Save response for debugging
        with open(os.path.join(output_dir, "last_response.json"), "w") as f:
            json.dump(result, f, indent=2)
            
        print("Response received from OpenRouter.")
        return result
    except Exception as e:
        print(f"Error calling OpenRouter API: {e}")
        return None

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Advanced Scene Reconstruction using Nano Banana Pro")
    parser.add_argument("--image-a", type=str, help="Path to pavement reference image")
    parser.add_argument("--image-b", type=str, help="Path to scene reference image")
    parser.add_argument("--test", action="store_true", help="Run in test mode")

    args = parser.parse_args()

    if args.test:
        print("Test mode enabled.")
        print(f"Would reconstruct using Image A: {args.image_a} and Image B: {args.image_b}")
    elif args.image_a and args.image_b:
        generate_reconstruction(args.image_a, args.image_b)
    else:
        print("Please provide --image-a and --image-b")
