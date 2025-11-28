import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

// Image generation API endpoint using Google Gemini Nano Banana (gemini-2.5-flash-image-preview)
export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      console.error("[v0] API key not found")
      return NextResponse.json(
        {
          error: "API key not configured",
          success: false,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Generating image with Gemini Nano Banana, prompt:", prompt.substring(0, 50) + "...")

    const ai = new GoogleGenAI({ apiKey })

    const enhancedPrompt = `${prompt}. Professional quality, photorealistic, suitable for a presentation slide, 16:9 aspect ratio, high quality, detailed.`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: enhancedPrompt,
    })

    console.log("[v0] Nano Banana response received")

    // Extract image from response
    const candidate = response.candidates?.[0]
    if (!candidate) {
      throw new Error("No image generated")
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data
        const mimeType = part.inlineData.mimeType || "image/png"
        const imageUrl = `data:${mimeType};base64,${imageData}`

        console.log("[v0] Image generated successfully with Nano Banana")

        return NextResponse.json({
          imageUrl,
          success: true,
        })
      }
    }

    throw new Error("No image data in response")
  } catch (error) {
    console.error("[v0] Error generating image:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate image",
        success: false,
      },
      { status: 500 },
    )
  }
}
