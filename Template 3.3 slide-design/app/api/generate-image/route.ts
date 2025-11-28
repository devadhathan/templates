import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent`,
      {
        method: "POST",
        headers: {
          "x-goog-api-key": apiKey,
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
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[v0] API error:", errorData)
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.candidates || data.candidates.length === 0) {
      return NextResponse.json({ error: "No image generated" }, { status: 500 })
    }

    const firstCandidate = data.candidates[0]
    const imagePart = firstCandidate.content.parts.find((part: any) => part.inlineData)

    if (!imagePart || !imagePart.inlineData) {
      return NextResponse.json({ error: "No image data in response" }, { status: 500 })
    }

    const imageData = imagePart.inlineData.data
    const mimeType = imagePart.inlineData.mimeType || "image/png"

    // Return image as base64 data URL
    return NextResponse.json({
      imageUrl: `data:${mimeType};base64,${imageData}`,
    })
  } catch (error) {
    console.error("[v0] Image generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate image", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
