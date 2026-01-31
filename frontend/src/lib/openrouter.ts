/**
 * OpenRouter API Integration
 * 
 * This file contains placeholder functions for OpenRouter integration.
 * When deploying to Vercel, add your OPENROUTER_API_KEY as an environment variable.
 * 
 * To complete the integration:
 * 1. Add OPENROUTER_API_KEY to your Vercel environment variables
 * 2. Implement the generateVisualization function with actual API calls
 * 3. Handle the response and return the generated image URL
 */

export interface GenerateVisualizationParams {
  imageBase64: string;
  stoneType: string;
  stoneDescription: string;
  pavementUrl?: string;
}

export interface GenerateVisualizationResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

/**
 * Generate a visualization of the backyard with the selected stone type.
 * 
 * TODO: Implement this function with OpenRouter API calls.
 * 
 * Example implementation:
 * ```
 * const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
 *   method: 'POST',
 *   headers: {
 *     'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
 *     'Content-Type': 'application/json',
 *   },
 *   body: JSON.stringify({
 *     model: 'google/gemini-2.0-flash-exp:free', // or your preferred model
 *     messages: [
 *       {
 *         role: 'user',
 *         content: [
 *           { type: 'text', text: `Transform this backyard image to show ${stoneType} paving...` },
 *           { type: 'image_url', image_url: { url: imageBase64 } }
 *         ]
 *       }
 *     ]
 *   })
 * });
 * ```
 */
export async function generateVisualization(
  params: GenerateVisualizationParams
): Promise<GenerateVisualizationResult> {
  try {
    const formData = new FormData();

    // Check if imageBase64 is a data URL or just base64
    let blob: Blob;
    if (params.imageBase64.startsWith('data:')) {
      const resp = await fetch(params.imageBase64);
      blob = await resp.blob();
    } else {
      // Assuming it's already a blob or we handle it accordingly
      // For now, let's assume the component provides a data URL
      const resp = await fetch(params.imageBase64);
      blob = await resp.blob();
    }

    formData.append('image_b', blob, 'scene.jpg');

    // Stone type is provided as a URL or a name. 
    // In our case, StoneSelector provides the full StoneType object,
    // and VisualizationTool passes stoneType (name) and stoneDescription.
    // However, the backend needs the ACTUAL pavement image.
    // We should probably pass the stone's imageUrl if available.

    // Example of how VisualizationTool should call this function:
    //   const result = await generateVisualization({
    //     imageBase64: uploadedImage,
    //     stoneType: selectedStone.name,
    //     stoneDescription: selectedStone.description,
    //     pavementUrl: selectedStone.imageUrl,
    //   });

    // For now, let's look for a stone image URL in a hypothetical extended params
    // OR assume stoneType is actually a URL if we modify the caller.

    if (params.pavementUrl) {
      formData.append('pavement_url', params.pavementUrl);
    } else {
      // Fallback or error
      return { success: false, error: 'No stone reference provided' };
    }

    const response = await fetch('http://localhost:8080/reconstruct', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to generate reconstruction');
    }

    const data = await response.json();

    if (data.status === 'success' && data.result.choices?.[0]?.message?.images?.[0]?.image_url?.url) {
      return {
        success: true,
        imageUrl: data.result.choices[0].message.images[0].image_url.url,
      };
    } else {
      return {
        success: false,
        error: 'No image returned from model',
      };
    }
  } catch (error) {
    console.error('Reconstruction error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Submit a quote request to your backend.
 * 
 * TODO: Implement this function to send quote data to your backend/CRM.
 */
export interface QuoteRequestParams {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  originalImageUrl?: string;
  generatedImageUrl?: string;
  selectedStone?: string;
}

export async function submitQuoteRequest(
  params: QuoteRequestParams
): Promise<{ success: boolean; error?: string }> {
  // Simulate API delay for demo purposes
  await new Promise(resolve => setTimeout(resolve, 1000));

  // TODO: Replace this placeholder with actual backend API call
  console.log('Quote request submitted:', params);

  // For now, just return success
  return { success: true };
}
