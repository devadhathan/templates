import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    const NANO_BANANA_API_KEY = process.env.NANO_BANANA_API_KEY

    if (!NANO_BANANA_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${NANO_BANANA_API_KEY}`

    console.log("[v0] Generating image with prompt:", prompt)

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 1290,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] API error:", errorText)
      return NextResponse.json(
        {
          error: "Failed to generate image",
          details: errorText,
        },
        { status: response.status },
      )
    }

    const result = await response.json()
    console.log("[v0] API response received")

    const imageData = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data

    if (!imageData) {
      console.error("[v0] No image data in response:", JSON.stringify(result))
      return NextResponse.json({ error: "No image data in response" }, { status: 500 })
    }

    const imageUrl = `data:image/png;base64,${imageData}`

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error("[v0] Error generating image:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate image" },
      { status: 500 },
    )
  }
}
