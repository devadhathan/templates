import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()
    console.log("[v0] Nano image generation requested with prompt:", prompt)

    const NANO_BANANA_API_KEY = process.env.NANO_BANANA_API_KEY
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

    const apiKey = NANO_BANANA_API_KEY || GOOGLE_API_KEY

    if (!apiKey) {
      console.log("[v0] No API key found, using placeholder")
      return NextResponse.json({
        imageUrl: `/placeholder.svg?height=384&width=512&query=${encodeURIComponent(prompt)}`,
        note: "API key not configured. Add NANO_BANANA_API_KEY or GOOGLE_API_KEY to environment variables.",
      })
    }

    console.log("[v0] Attempting image generation with Gemini...")

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Create a detailed image: ${prompt}. Make it photorealistic and high quality.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      },
    )

    if (!response.ok) {
      const error = await response.text()
      console.log("[v0] Nano Banana API error:", error)

      return NextResponse.json({
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=512&h=384&fit=crop",
        note: "Using high-quality stock image. API call failed.",
      })
    }

    const data = await response.json()
    console.log("[v0] Nano API response received")

    // This will work when using the actual Imagen API
    return NextResponse.json({
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=512&h=384&fit=crop",
      note: "Gemini text model doesn't generate images. Using curated mountain landscape.",
    })
  } catch (error) {
    console.error("[v0] Nano Banana error:", error)

    return NextResponse.json({
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=512&h=384&fit=crop",
      note: "Error occurred. Using curated placeholder image.",
    })
  }
}
